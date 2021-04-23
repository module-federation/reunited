const {test_bundle} = require('./remoteEntry');
const workerpool = require('workerpool');

function render(props) {
  return test_bundle.get('./render').then((factory)=>{
    const Module = factory();
    return Module.default(props)
  })
}

// create a worker and register functions
workerpool.worker({
  render: render
});
