const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/app.ts',
  output: {
    assetModuleFilename: 'assets/[hash][ext]',
  },
  module: {
    rules: [
      {
        test: /\.ts?/,
        use: 'ts-loader',
        exclude: /mode_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        use: 'url-loader?limit=100000',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          sources: false // don't process src attribute
        }
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.EnvironmentPlugin([
      'API_LASTFM',
      'SECRET_LASTFM',
      'API_SPOTIFY',
      'SECRET_SPOTIFY',
    ]),
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
  ],
};
