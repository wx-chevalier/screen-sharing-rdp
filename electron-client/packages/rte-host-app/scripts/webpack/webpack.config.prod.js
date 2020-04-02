const merge = require('webpack-merge');
const path = require('path');
const themeConfig = require('./webpack.config.theme');

const prodConfig = require('../../../../scripts/webpack/webpack.config')
  .prodConfig;

const config = merge(themeConfig, prodConfig, {
  entry: {
    index: path.resolve(__dirname, '../../src/index'),
  },
  output: {
    publicPath: 'a/b',
  },
});

module.exports = config;
