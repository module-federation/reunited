'use strict';

const glob = require('glob');
const webpack = require('webpack');
const StatsWebpackPlugin = require('stats-webpack-plugin');
const JestWebpackPlugin = require('reunited/Plugin');
const path = require('path')
/**
 * Given a glob pattern returns the matched paths as an entry point object for Webpack.
 * @param  {String} globPattern A glob pattern to match tests.
 * @return {Object}             Key value pairs, keyed on filepath.
 */
function getEntryPoints(globPattern) {
    var testFiles = glob.sync(globPattern);
    var entryPoints = {};
    testFiles.forEach(function(file) {
        entryPoints[file.replace(/\.js$/, '')] = './' + file;
    });
    return entryPoints;
}

let entryPoints = getEntryPoints('src/**/__tests__/*');
entryPoints.setup = './setup';

module.exports = {
    target: 'web',
    entry: entryPoints,
    output: {
        path: path.resolve(__dirname,'__bundled_tests__'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'reunited/ManualMockLoader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader!css?modules&localIdentName=[local]'
            }
        ]
    },
    optimization: {
        splitChunks: {
            name: "setup",
            filename: "common.js"
        }
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new JestWebpackPlugin(),
        new StatsWebpackPlugin('stats.json'),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        })
    ]
};

//{
//   fastUnsafe: [],
//   alias: {},
//   packageAlias: 'browser',
//   modulesDirectories: [ 'web_modules', 'node_modules' ],
//   packageMains: [
//     'webpack',
//     'browser',
//     'web',
//     'browserify',
//     [ 'jam', 'main' ],
//     'main'
//   ],
//   extensions: [ '', '.webpack.js', '.web.js', '.js', '.json' ]
// }
// {
//   loaderLessRawRequest: './createArrayFromMixed',
//   resourcePath: '/Volumes/lulu_dev/reunited/example/node_modules/react/lib/createArrayFromMixed.js',
//   modulesDirectories: [ 'web_modules', 'node_modules' ]
// }
