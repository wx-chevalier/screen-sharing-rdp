let peerConnection = null;
let dataChannel = null;

let resolutionMap = {
  screenWidth: 0,
  screenHeight: 0,
  canvasWidth: 0,
  canvasHeight: 0,
};

function showError(error) {
  const errorNode = document.querySelector("#error");
  if (errorNode.firstChild) {
    errorNode.removeChild(errorNode.firstChild);
  }
  errorNode.appendChild(document.createTextNode(error.message || error));
}

function startSession(offer, screen) {
  return fetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      offer,
      screen,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((msg) => {
      return msg.answer;
    });
}

function createOffer(pc, { audio, video }) {
  return new Promise((accept, reject) => {
    pc.onicecandidate = (evt) => {
      if (!evt.candidate) {
        // ICE Gathering finished
        const { sdp: offer } = pc.localDescription;
        accept(offer);
      }
    };
    pc.createOffer({
      offerToReceiveAudio: audio,
      offerToReceiveVideo: video,
    })
      .then((ld) => {
        pc.setLocalDescription(ld);
      })
      .catch(reject);
  });
}

function sendDataMessage(command, data) {
  if (dataChannel) {
    // Send cordinates
    dataChannel.send(
      JSON.stringify({
        command: command,
        data: data,
      })
    );
  }
}

function enableMouseEvents(dataChannel) {
  // Start sending mouse cordinates on mouse move in canvas
  const remoteCanvas = document.getElementById("remote-canvas");

  // On Mouse move
  remoteCanvas.addEventListener("mousemove", (event) => {
    // Get cordinates
    const cordinates = scaleCordinatesToOriginalScreen(event);

    // Send cordinates
    sendDataMessage("mousemove", {
      x: cordinates.x,
      y: cordinates.y,
    });
  });

  // On Mouse Click
  remoteCanvas.addEventListener("mousedown", (event) => {
    let button = "left";

    switch (event.which) {
      case 1:
        button = "left";
        break;

      case 2:
        button = "center";
        break;

      case 3:
        button = "right";
        break;

      default:
        button = "left";
    }

    sendDataMessage("click", {
      button,
    });
  });

  // On Mouse Double Click
  remoteCanvas.addEventListener("dblclick", (event) => {
    let button = "left";

    switch (event.which) {
      case 1:
        button = "left";
        break;

      case 2:
        button = "center";
        break;

      case 3:
        button = "right";
        break;

      default:
        button = "left";
    }

    sendDataMessage("dblclick", {
      button,
    });
  });

  // On Mouse Scroll
  remoteCanvas.addEventListener("wheel", (event) => {
    const delta = Math.sign(event.deltaY);
    const direction = delta > 0 ? "down" : "up";
    sendDataMessage("mousescroll", {
      direction,
    });
  });

  /** DOCUMENT LEVEL EVENT LISTENERS */
  // Read keyboard events
  document.addEventListener("keydown", (event) => {
    sendDataMessage("keydown", {
      keyCode: event.keyCode,
    });
  });
}

function scaleCordinatesToOriginalScreen(event) {
  const remoteCanvas = document.getElementById("remote-canvas");
  // Get canvas size
  const rect = remoteCanvas.getBoundingClientRect();
  // Get mouse cordinates on canvas
  const x = (event.clientX - rect.left).toFixed(0);
  const y = (event.clientY - rect.top).toFixed(0);
  // Calculate screen percentage based on canvas
  const xPer = (x / resolutionMap.canvasWidth) * 100;
  const yPer = (y / resolutionMap.canvasHeight) * 100;
  // Map percentage to original screen
  return {
    x: ((resolutionMap.screenWidth * xPer) / 100).toFixed(0),
    y: ((resolutionMap.screenHeight * yPer) / 100).toFixed(0),
  };
}

function startRemoteSession(screen, remoteVideoNode, stream) {
  let pc;

  return Promise.resolve()
    .then(() => {
      pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      dataChannel = pc.createDataChannel("messages");

      dataChannel.onopen = function (event) {
        enableMouseEvents(dataChannel);

        // Fetch screen size from server
        sendDataMessage("screensize", {});
      };

      dataChannel.onmessage = function (event) {
        try {
          const message = JSON.parse(event.data);
          switch (message.command) {
            case "screensize":
              resolutionMap.screenHeight = message.data.height;
              resolutionMap.screenWidth = message.data.width;
              break;

            case "mousepose":
              console.log(message);
              break;
          }
        } catch (e) {
          console.error(e);
        }
      };

      pc.ontrack = (evt) => {
        remoteVideoNode.srcObject = evt.streams[0];
        remoteVideoNode.play();
      };

      stream &&
        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
        });

      return createOffer(pc, { audio: false, video: true });
    })
    .then((offer) => {
      return startSession(offer, screen);
    })
    .then((answer) => {
      return pc.setRemoteDescription(
        new RTCSessionDescription({
          sdp: answer,
          type: "answer",
        })
      );
    })
    .then(() => pc);
}

function resizeCanvas(canvas, video) {
  const w = video.offsetWidth;
  const h = video.offsetHeight;
  canvas.width = w;
  canvas.height = h;

  resolutionMap.canvasHeight = h;
  resolutionMap.canvasWidth = w;
}

function disconnectSession() {
  sendDataMessage("terminate", {});
  peerConnection.close();
  peerConnection = null;
  dataChannel = null;
  enableStartStop(true);
  setStartStopTitle("Connect");
}

const enableStartStop = (enabled) => {
  const startStop = document.querySelector("#start-stop");
  if (enabled) {
    startStop.removeAttribute("disabled");
  } else {
    startStop.setAttribute("disabled", "");
  }
};

const setStartStopTitle = (title) => {
  const startStop = document.querySelector("#start-stop");
  startStop.removeChild(startStop.firstChild);
  startStop.appendChild(document.createTextNode(title));
};

document.addEventListener("DOMContentLoaded", () => {
  let selectedScreen = 0;
  const remoteVideo = document.querySelector("#remote-video");
  const remoteCanvas = document.querySelector("#remote-canvas");
  // Disable right click context on canvas
  remoteCanvas.oncontextmenu = function (e) {
    e.preventDefault();
  };

  const startStop = document.querySelector("#start-stop");

  remoteVideo.onplaying = () => {
    setInterval(() => {
      resizeCanvas(remoteCanvas, remoteVideo);
    }, 1000);
  };

  startStop.addEventListener("click", () => {
    enableStartStop(false);

    const userMediaPromise =
      adapter.browserDetails.browser === "safari"
        ? navigator.mediaDevices.getUserMedia({ video: true })
        : Promise.resolve(null);
    if (!peerConnection) {
      userMediaPromise.then((stream) => {
        return startRemoteSession(selectedScreen, remoteVideo, stream)
          .then((pc) => {
            remoteVideo.style.setProperty("visibility", "visible");
            peerConnection = pc;
          })
          .catch(showError)
          .then(() => {
            enableStartStop(true);
            setStartStopTitle("Disconnect");
          });
      });
    } else {
      disconnectSession();
      remoteVideo.style.setProperty("visibility", "collapse");
    }
  });
});

window.addEventListener("beforeunload", () => {
  if (peerConnection) {
    peerConnection.close();
  }
});
