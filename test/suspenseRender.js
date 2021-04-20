import React from 'react'
import {renderToStringAsync} from 'react-async-ssr'
import {ChunkExtractor} from 'react-lazy-ssr/server';
class BaseApp extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){return this.props.children}
}
const renderApp = async (App) => {
  const stats = require('./reactLazySsrStats.json');
  const chunkExtractor = new ChunkExtractor( { stats } );
  const app = chunkExtractor.collectChunks( <App /> );
  const element = await renderToStringAsync(app)
return element
}
const start = async (Application)=>{
  const App = ()=><BaseApp><Application/></BaseApp>;
  const html = await renderApp(App);
  return html
}
export default start;
