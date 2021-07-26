const path = require('path');
const webpack = require('webpack');
// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENTRY_VIEWPORT = path.join(__dirname, './../src/index.js');
const ENTRY_EXAMPLES = path.join(__dirname, './../examples/index.js');
const SRC_PATH = path.join(__dirname, './../src');
const OUT_PATH = path.join(__dirname, './../dist');

module.exports = {
  mode: 'development',
  entry: {
    examples: ENTRY_EXAMPLES,
  },
  devtool: 'source-map',
  output: {
    path: OUT_PATH,
    filename: '[name].bundle.[fullhash].js',
    library: 'cornerstoneViewport',
    libraryTarget: 'umd',
    globalObject: 'this',
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
  resolve: {
    // Fix for `cornerstone-wado-image-loader` fs dep
    fallback: {
        "fs": false,
        "path": false,
    },
    modules: [path.resolve(__dirname, './../node_modules'), SRC_PATH],
    alias: {
      '@cornerstone-viewport': ENTRY_VIEWPORT,
    },
  },
  plugins: [
    // Generate `index.html` with injected build assets
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '..', 'examples', 'index.html'),
    }),
  ],
  devServer: {
    hot: true,
    open: true,
    port: 3000,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
};
