const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CopyStyleFile = require('copy-style-file');

module.exports = {
    entry: {
        demo: `./demo/src/js/demo.js`,
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, `demo/dist`)
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                    plugins: [
                        ["transform-runtime", {
                            "helpers": false,
                            "polyfill": false,
                            "regenerator": true,
                            "moduleName": "babel-runtime"
                        }]
                    ]
                }
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from:`./demo/src/view/index.html`, to:'index.html' },
            { from:`./demo/src/assets/icons/`, to:'icons' }
        ]),
        new CopyStyleFile([
            {from: `./demo/src/less/style.less`, to: 'css/style.css'}
        ])
    ]
};