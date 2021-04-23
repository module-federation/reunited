const path = require('path');
const glob = require('glob');
const webpack = require("webpack")
const {ModuleFederationPlugin} = webpack.container
const HTMLPlugin = require('html-webpack-plugin')
const deps = require('../package.json')
const reunited = require('../index')
module.exports = {
  entry: require.resolve('./index.js'),
  output: {
    path: path.resolve(__dirname, "./dist-test"),
  },
  target: "node",
  resolve: {
    fallback: {
      path: false
    }
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'fed_consumer',
      filename: "remoteEntry.js",
      library: {type: "commonjs-module", name: "fed_consumer"},
      remotes: {
        "federated": reunited(path.resolve(__dirname, '../federated-test/dist-test/remoteEntry.js'), "federated")
      },
      exposes: {
        "./Form": "./federated-cross-test/form.js"
      },
      shared: {
        react: deps.devDependencies.react,
        "react-dom": deps.devDependencies["react-dom"]
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || "test"),
    })
  ]
};
