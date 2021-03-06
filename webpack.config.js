const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    // webpack wants absolute path for output
    // __dirname returns the absolute path for the current file
    // path.join will concatenate multiple '/path' (considers '/' as delimiter)
    // path.resolve only uses the last '/path' (considers '/' as the root)
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist', // tell webpack to serve the bundle at '/dist' folder (by default it serves at the same path as index.html)
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts?/,
        use: 'ts-loader',
        exclude: /mode_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        // Chain the sass-loader with the css-loader and the style-loader to immediately apply all styles to the DOM or the mini-css-extract-plugin to extract it into a separate file.
        use: [
          // Creates `style` nodes from JS strings
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
  ],
};
