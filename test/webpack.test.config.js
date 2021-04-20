const path = require('path');
const glob = require('glob');
const thisFile = path.basename(__filename);
const nodeExternals = require('webpack-node-externals')
const {ModuleFederationPlugin} = require("webpack").container
const ReactLazySsrPlugin = require('react-lazy-ssr/webpack');
const reunited = require('../index')
const testFiles = glob.sync("!(node_modules)/**/*.test.js").filter(function (element) {
  return element != "test/bundle.test.js" && !element.includes(thisFile);
}).map(function (element) {
  return "./" + element;
});
module.exports = {
  entry: {"bundle.test":testFiles},
  output: {
    path: path.resolve(__dirname, "."),
    filename: "[name].js"
  },
  target: "node",
  resolve: {
    fallback: {
      path: false
    }
  },
  externals: [nodeExternals({
    allowlist: [/^webpack\/container\/reference\//,/react/]
  })],
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
      name: "test_bundle",
      library: {type: "commonjs-module", name: "test_bundle"},
      filename: "remoteEntry.js",
      exposes: {
        "./render":"./test/suspenseRender.js"
      },
      remotes: {
        // Tobias, why do i need to do this in order to get the remote to properly resolve
        "federated": reunited(path.resolve(__dirname,'../federated-test/dist-test/remoteEntry.js'),"federated"),
        "fed_consumer": reunited(path.resolve(__dirname,'../federated-cross-test/dist-test/remoteEntry.js'),'fed_consumer')
      }
    }),
    new ReactLazySsrPlugin()
  ]
};
