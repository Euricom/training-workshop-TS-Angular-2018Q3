/* eslint-disable */
const path = require('path')

module.exports = {
  entry: './app/main.ts',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'bundle'),
    publicPath: '/bundle/',
  },
  module: {
    rules: [{
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
    ],
  },
  node: {
    fs: 'empty',
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false,
    contentBase: 'app',
  },
}
