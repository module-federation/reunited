const path = require('path');
const glob = require('glob');
const webpack = require('webpack')
const {ModuleFederationPlugin} = webpack.container
const deps = require('../package.json')

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
      name: 'federated',
      filename: "remoteEntry.js",
      library: {type: "commonjs-module", name: "federated"},
      exposes: {
        "./Button": "./federated-test/Button.js"
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
