const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dev = require('./dev');

const setReplace = (val) => {
  return val.replace(/\"/g, "");
}

module.exports = {
  devServer: {
    contentBase: `./${setReplace(dev.PUBLICPATH)}`,
    historyApiFallback: {
      index: `/${setReplace(dev.PUBLICPATH)}/index.html`
    },
    host: setReplace(dev.HOST) || 'localhost',
    port: setReplace(dev.PORT) || 8000,
    noInfo: true,
    inline: true,
    hot: true,
    proxy: {
      '/api':{
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  performance: {
    hints: false
  },
  plugins: (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': dev
    }),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './index.html',
      inject: true
    })
  ])
}