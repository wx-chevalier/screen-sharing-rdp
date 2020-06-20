# node-desktop-capturer

Take a screenshot of the computer on which Node is running, using platform-specific external tools included with the package.

Supports Windows (win32), OSX (darwin) and Linux platforms

- Windows version uses nircmd (http://nircmd.nirsoft.net)
- Linux version uses scrot

## How to install

This is a forked version of a module, so to install it in your project use `yarn add https://github.com/jhotujec/node-node-desktop-capturer`

## Available Options

- quality: JPEG quality (0 to 100)
- width: use in conjunction with height, or by itself to maintain aspect ratio
- height: use in conjunction with width, or by itself to maintain aspect ratio

## Examples

### Full resolution

```js
var screenshot = require("node-desktop-capturer");

screenshot("screenshot.png", function (error, complete) {
  if (error) console.log("Screenshot failed", error);
  else console.log("Screenshot succeeded");
});
```

### Resize to 400px wide, maintain aspect ratio

```js
var screenshot = require("node-desktop-capturer");

screenshot("screenshot.png", { width: 400 }, function (error, complete) {
  if (error) console.log("Screenshot failed", error);
  else console.log("Screenshot succeeded");
});
```

### Resize to 400x300, set JPG quality to 60%

```js
var screenshot = require("node-desktop-capturer");

screenshot(
  "screenshot.jpg",
  { width: 400, height: 300, quality: 60 },
  function (error, complete) {
    if (error) console.log("Screenshot failed", error);
    else console.log("Screenshot succeeded");
  }
);
```

## TODOs

- Tests
- Multi-screen support
- Cropping
- Return contents of image, rather than writing file
