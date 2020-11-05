module.exports = function (options, callback) {
  var fs = require("fs");
  var childProcess = require("child_process");
  var path = require("path");

  const cmdPath1 = path.join(
    __dirname.replace("app.asar", "app.asar.unpacked"),
    "bin",
    "nircmd.exe"
  );

  // 有时候会在 node_modules 路径下
  const cmdPath2 = path.join(
    __dirname.replace("app.asar", "app.asar.unpacked"),
    "node_modules/node-desktop-capturer/capture",
    "bin",
    "nircmd.exe"
  );

  var nircmd = childProcess.spawn(
    fs.existsSync(cmdPath1) ? cmdPath1 : cmdPath2,
    ["savescreenshot", options.output]
  );

  nircmd.on("close", function (code, signal) {
    try {
      fs.statSync(options.output);
      callback(null, options); // callback with options, in case options added
    } catch (error) {
      callback("file_not_found", null);
    }
  });
};
