const pkg = require('./package');
const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const banner = `/*!
 *   Morpheus canvas image resize
 *   version: ${pkg.version}
 *    author: ${pkg.author.name} <${pkg.author.email}>
 *   website: ${pkg.author.url}
 *    github: ${pkg.repository.url}
 *   license: ${pkg.license}
 */
`;

module.exports = {
    input: 'src/morpheus.js',
    output: [
        {
            banner,
            file: 'dist/morpheus.js',
            format: 'umd',
            name: 'Morpheus'
        },
        {
            banner,
            file: 'dist/morpheus.common.js',
            format: 'cjs'
        },
        {
            banner,
            file: 'dist/morpheus.esm.js',
            format: 'es'
        }
    ],
    plugins: [
        nodeResolve(),
        commonjs(),
        babel({
            plugins: [
                ['external-helpers'],
                ["transform-runtime", {
                    "helpers": false,
                    "polyfill": false,
                    "regenerator": true,
                    "moduleName": "babel-runtime"
                }]
            ],
            presets: [
                ['env', {modules: false}]
            ]
        })
    ]
};