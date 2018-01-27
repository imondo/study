const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('./build/index')

const webpackConfig = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, `./${config.assetsPublicPath}/`),
    publicPath: `/${config.assetsPublicPath}/`,
    filename: `build.js?version=${config.version}`
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: [
            require('autoprefixer')({
              browsers: ['last 100 versions']
            })
          ]
        }
      },
      {
        test: /\.css$/,
        loader: `style-loader!css-loader`
      },
      {
        test: /\.less$/,
        loader: `style-loader!css-loader!autoprefixer-loader?{ browsers: ["last 100 versions"] }!less-loader`
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(eot|svg|ttf|woff2?)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.less'], // 后缀名自动补全
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '~': path.resolve('src'),
      'src': path.resolve(__dirname, '../src'),
      'components': path.resolve(__dirname, 'src/components'),
      'views': path.resolve(__dirname, 'src/views')
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

module.exports = merge(webpackConfig, config.mergePath);