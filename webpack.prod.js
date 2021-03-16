const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'main.[contenthash].js',
    // webpack wants absolute path for output
    // __dirname returns the absolute path for the current file
    // path.join will concatenate multiple '/path' (considers '/' as delimiter)
    // path.resolve only uses the last '/path' (considers '/' as the root)
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        // Chain the sass-loader with the css-loader and the style-loader to immediately apply all styles to the DOM or the mini-css-extract-plugin to extract it into a separate file.
        use: [
          MiniCssExtractPlugin.loader,
          {
            // Translates CSS into CommonJS
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            // Compiles Sass to CSS
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // copy files in assets folder to dist/assets/
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, "src/assets"), to: "assets"}
      ]
    })
  ],
});
