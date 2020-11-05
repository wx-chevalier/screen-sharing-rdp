package api

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/imtiyazs/webrtc-remote-desktop/internal/rdisplay"
	"github.com/imtiyazs/webrtc-remote-desktop/internal/rtc"
)

func handleError(w http.ResponseWriter, err error) {
	fmt.Printf("Error: %v", err)
	w.WriteHeader(http.StatusInternalServerError)
}

// MakeHandler returns an HTTP handler for the session service
func MakeHandler(webrtc rtc.Service, display rdisplay.Service) http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/session", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			w.WriteHeader(http.StatusMethodNotAllowed)
			return
		}
		dec := json.NewDecoder(r.Body)
		req := newSessionRequest{}

		if err := dec.Decode(&req); err != nil {
			handleError(w, err)
			return
		}

		peer, err := webrtc.CreateRemoteScreenConnection(req.Screen, 24)
		if err != nil {
			handleError(w, err)
			return
		}

		answer, err := peer.ProcessOffer(req.Offer)

		if err != nil {
			handleError(w, err)
			return
		}

		payload, err := json.Marshal(newSessionResponse{
			Answer: answer,
		})
		if err != nil {
			handleError(w, err)
			return
		}

		w.Write(payload)
	})
	
	return mux
}
