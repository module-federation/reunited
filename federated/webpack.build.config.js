const path = require('path');
const glob = require('glob');
const {ModuleFederationPlugin} = require("webpack").container
module.exports = {
  entry: require.resolve('./index.js'),
  output: {
    path: path.resolve(__dirname, "./dist"),
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
      filename:"remoteEntry.js",
      library: {type: "commonjs", name: "federated"},
      exposes: {
        "./Button": "./federated/Button.js"
      }
    })
  ]
};
