const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|ico|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        type: 'asset/resource',
      },
      // {
      //   test: /\.html$/,
      //   loader: 'html-loader',
      //   // options: {
      //   //   sources: false, // don't process src attribute
      //   // },
      // },
    ],
  },

  plugins: [],
});
