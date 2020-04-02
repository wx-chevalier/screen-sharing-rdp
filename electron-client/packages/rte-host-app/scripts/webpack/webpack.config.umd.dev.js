const path = require('path');
const merge = require('webpack-merge');

const themeConfig = require('./webpack.config.theme');
const { umdConfig } = require('../../../../scripts/webpack/webpack.config');

module.exports = merge(umdConfig, themeConfig, {
  entry: {
    index: path.resolve(__dirname, '../../src/index.umd'),
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../../public'),
    port: 8081,
  },
  output: {
    libraryTarget: 'umd',
  },
});
