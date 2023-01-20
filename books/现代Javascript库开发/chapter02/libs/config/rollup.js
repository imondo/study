const pkg = require('../package.json')
const babel = require('rollup-plugin-babel')

const version = pkg.version

const banner = `/*!
* ${pkg.name} ${version}
* Licensed under MIT
*/
`

function getCompiler(opt) {
    return babel({
        babelrc: false,
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: {
                        browsers: 'last 2 versions, > 1%, ie >= 8, chrome >= 45, safari >= 10',
                        node: '0.12'
                    },
                    modules: false,
                    loose: true // 松散模式，更好的兼容 IE8
                }
            ]
        ],
        plugins: [
            [
                '@babel/plugin-transform-runtime',
                {
                    corejs: 2
                }
            ]
        ],
        runtimeHelpers: true,
        exclude: 'node_modules/**'
    })
}

exports.banner = banner

exports.getCompiler = getCompiler