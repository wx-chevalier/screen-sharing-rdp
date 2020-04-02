module.exports = require('@m-fe/webpack-config')({
  themeVars: {
    'primary-color': '#2e72b8',
    '@link-color': '#2e72b8',
  },
  extendedBaseConfig: {
    target: 'electron-renderer',
    output: { publicPath: './' },
    module: {
      rules: [
        // {
        //   test: /\.s[ac]ss$/i,
        //   use: [
        //     // Creates `style` nodes from JS strings
        //     'style-loader',
        //     // Translates CSS into CommonJS
        //     'css-loader',
        //     // Compiles Sass to CSS
        //     'sass-loader',
        //   ],
        // },
        // svg 的加载交于应用自身决定
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          oneOf: [
            {
              issuer: /\.[jt]sx?$/,
              use: [
                {
                  loader: '@svgr/webpack',
                  // loader: 'svg-inline-loader',
                },
              ],
            },
            {
              loader: 'url-loader',
            },
          ],
        },
      ],
    },
    resolve: {
      alias: {
        dayjs: 'dayjs/esm',
        moment$: 'dayjs/esm',
        systemjs$: 'systemjs/dist/system.js',
      },
    },
  },
});
