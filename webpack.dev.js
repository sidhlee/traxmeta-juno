const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    // webpack wants absolute path for output
    // __dirname returns the absolute path for the current file
    // path.join will concatenate multiple '/path' (considers '/' as delimiter)
    // path.resolve only uses the last '/path' (considers '/' as the root)
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist', // tell webpack to serve the bundle at '/dist' folder (by default it serves at the same path as index.html)
  },
  devServer: {
    contentBase: './dist', // only needed if you want to server static files
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        // Chain the sass-loader with the css-loader and the style-loader to immediately apply all styles to the DOM or the mini-css-extract-plugin to extract it into a separate file.
        use: [
          'style-loader',
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
});
