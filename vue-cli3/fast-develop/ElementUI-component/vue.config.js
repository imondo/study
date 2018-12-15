const webpack = require('webpack');

module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.IgnorePlugin(/cptable/)
        ],
        node: {
            fs: "empty"
        },
        externals: [
            {  "./cptable": "var cptable",  "./jszip": "jszip" }
        ]
    }
};