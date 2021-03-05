const path = require('path');

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
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
