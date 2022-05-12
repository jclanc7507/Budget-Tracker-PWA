const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const config = {
  entry: {
    app: './server.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: `${__dirname}/dist`
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name(file) {
                return '[path][name].[ext]';
              },
              publicPath(url) {
                return url.replace('../', '/public/');
              }
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    }),
    new WebpackPwaManifest({
      name: 'Budget Tracker',
      short_name: 'Budget',
      start_url: '../server.js',
      background_color: '#01579b',
      theme_color: '#ffffff',
      display: "standalone",
      fingerprints: false,
      inject: false,
      icons: [
        {
          src: path.resolve('public/icons/icon-512x512.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('public', 'icons')
        }
      ]
    })
  ],
  mode: 'development'
};

module.exports = config;
