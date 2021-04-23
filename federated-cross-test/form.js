import React from "react";
import lazy from 'react-lazy-ssr';
const Button = lazy(()=>import('federated/Button'),{chunkId:"federated/Button"})
// const Button = process.env.NODE_ENV === 'test' ? require('federated/Button').default : React.lazy(()=>import('federated/Button'))
// const Suspense = process.env.NODE_ENV === 'test' ? ({children})=>children : React.Suspense
const Suspense = React.Suspense
const Form = () =>(
  <form>
    <input type="text"/>
    <Suspense fallback={"failed"} loading={"loading"}>
      <Button/>
    </Suspense>
  </form>
)
export default Form
