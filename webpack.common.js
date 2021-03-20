const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/app.ts',
  module: {
    rules: [
      {
        test: /\.ts?/,
        use: 'ts-loader',
        exclude: /mode_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // template: './src/template.html',
      favicon: './src/assets/favicon.ico',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
