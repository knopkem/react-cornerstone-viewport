const path = require('path');

const ENTRY_VIEWPORT = path.join(__dirname, './../src/index.js');
const OUT_PATH = path.join(__dirname, './../dist');

module.exports = {
  mode: 'production',
  entry: ENTRY_VIEWPORT,
  output: {
    path: OUT_PATH,
    filename: 'index.js',
    library: 'cornerstoneViewport',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  // Fix for `cornerstone-wado-image-loader` fs dep
  resolve: {
      fallback: {
          "fs": false,
          "path": false,
      }
  },
  optimization: {
        minimize: true,
  },
  externals: ['react', 'react-dom', 'react-router-dom', 'dicom-parser', 'hammerjs'],
};
