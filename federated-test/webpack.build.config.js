const path = require('path');
const webpack = require("webpack")
const {ModuleFederationPlugin} = webpack.container
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
      name: 'federated',
      filename:"remoteEntry.js",
      exposes: {
        "./Button": "./federated-test/Button.js"
      },
      shared: {
        react: deps.devDependencies.react,
        "react-dom": deps.devDependencies["react-dom"]
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || "development"),
    })
  ]
};
