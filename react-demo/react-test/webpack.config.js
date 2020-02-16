const path = require('path')

module.exports = {
  mode: "none",
  entry: "./src/App.js",
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: "./dist",
    hot: true,
    open: true
  }
};