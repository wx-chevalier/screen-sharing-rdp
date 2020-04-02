const path = require('path');
const CopyPkgJsonPlugin = require('copy-pkg-json-webpack-plugin');
const merge = require('webpack-merge');

const config = merge(
  require('@m-fe/webpack-config/webpack.config.node')({
    rootPath: path.resolve(__dirname, '../../'),
  }),
  {
    target: 'electron-main',
    node: {
      __dirname: false,
      __filename: false,
    },
    externals: {
      fsevents: "require('fsevents')",
    },
    plugins: [
      new CopyPkgJsonPlugin({
        remove: ['scripts', 'devDependencies', 'build'],
        replace: {
          main: './index.js',
          scripts: { start: 'electron ./index.js' },
          postinstall: 'electron-builder install-app-deps',
        },
      }),
    ],
  },
);

module.exports = config;
