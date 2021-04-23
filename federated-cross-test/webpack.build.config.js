const path = require('path');
const glob = require('glob');
const webpack = require("webpack")
const {ModuleFederationPlugin} = webpack.container
const HTMLPlugin = require('html-webpack-plugin')
const deps = require('../package.json')
module.exports = {
  entry: require.resolve('./index.js'),
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "auto"
  },
  cache:false,
  target: "web",
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
      filename:"remoteEntry.js",
      remotes: {
        "federated": "federated@http://localhost:3001/remoteEntry.js"
      },
      shared: {
        react: deps.devDependencies.react,
        "react-dom": deps.devDependencies["react-dom"]
      }
    }),
    new HTMLPlugin({
      templateContent:'<div id="app"></div>'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || "development"),
    })
]
};
