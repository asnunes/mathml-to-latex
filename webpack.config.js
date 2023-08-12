const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    library: 'MathMLToLaTeX',
    libraryExport: 'MathMLToLaTeX',
    libraryTarget: 'umd',
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'dist'),
    globalObject: 'this',
  },
  mode: 'production',
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/ }],
  },
  resolve: {
    alias: {
      MathMLToLaTeX: path.resolve(__dirname, 'dist', 'index.d.ts'),
    },
  },
};
