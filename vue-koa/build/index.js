const dev = require('./dev')
const test = require('./test')
const build = require('./build')

const webpackDev = require('./webpack.dev')
const webpackTest = require('./webpack.test')
const webpackProduction = require('./webpack.prod')

const mergePath = process.env.NODE_ENV === 'production' ? webpackProduction : (process.env.NODE_ENV === 'testing' ? webpackTest : webpackDev);
const assetsPublicPath = process.env.NODE_ENV === 'production'? build.PUBLICPATH: (process.env.NODE_ENV === 'testing' ? test.PUBLICPATH : dev.PUBLICPATH);
const version = process.env.NODE_ENV === 'production'? build.VERSION: (process.env.NODE_ENV === 'testing' ? test.VERSION : dev.VERSION);

module.exports = {
  assetsPublicPath: assetsPublicPath.replace(/\"/g, ""),
  version: version.replace(/\"/g, ""),
  mergePath
}