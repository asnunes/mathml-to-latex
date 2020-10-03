const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  mode: 'production',
  target: 'node',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts'],
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  output: {
    filename: 'mathml-to-latex.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
