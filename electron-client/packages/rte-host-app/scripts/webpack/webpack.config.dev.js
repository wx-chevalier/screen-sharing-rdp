const path = require('path');
const merge = require('webpack-merge');

const { devConfig } = require('../../../../scripts/webpack/webpack.config');

const themeConfig = require('./webpack.config.theme');

const config = merge(devConfig, themeConfig, {
  entry: {
    index: [
      'react-hot-loader/patch',
      path.resolve(__dirname, '../../src/index'),
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../../public'),
    hot: false,
  },
});

module.exports = config;
