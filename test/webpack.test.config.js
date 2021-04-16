const path = require('path');
const glob = require('glob');
const thisFile = path.basename(__filename);
const {ModuleFederationPlugin} = require("webpack").container
const testFiles = glob.sync("!(node_modules)/**/*.test.js").filter(function (element) {
  console.log(element, element != "test/bundle.test.js")
  return element != "test/bundle.test.js" && !element.includes(thisFile);
}).map(function (element) {
  return "./" + element;
});
console.log(testFiles);
module.exports = {
  entry: testFiles,
  output: {
    path: path.resolve(__dirname, "."),
    filename: "bundle.test.js"
  },
  target: "node",
  resolve: {
    fallback: {
      path: false
    }
  },
  mode: "none",
  plugins: [
    new ModuleFederationPlugin({
      name: "test_bundle",
      library: {type: "commonjs", name: "test_bundle"},
      remotes: {
        // Tobias, why do i need to do this in order to get the remote to properly resolve
        "federated": `promise new Promise(res => {
          let remote
          const remotePath = "${path.resolve(__dirname,'../federated/dist/remoteEntry.js')}"
          try {
          remote = require(remotePath)['federated']
          } catch (e) {
          delete require.cache[remotePath]
          remote = require(remotePath)['federated']
          }
          
          if(!remote.get) {
            return new Promise(function(delayResolve){
              var interval = setInterval(function(){
                 delete require.cache[remotePath]
                 remote = require(remotePath);
                if(require(remotePath)) {
                  console.log(remote);
                  delayResolve(require(remotePath)['federated']);
                  clearInterval(interval);
                }
              }, 50);

            })
          }
         
          const proxy = {get:(request)=> remote.get(request),init:(arg)=>{try {return remote.init(arg)} catch(e){console.log('remote container already initialized')}}}
          res(proxy)
          })`
      }
    })
  ]
};
