import React from 'react'
import ReactDOM from 'react-dom'
import { fork, hydrate } from 'effector/fork'
import { rootDomain } from 'lib/effector'
import { BrowserRouter } from 'react-router-dom'
import { App } from './app'



hydrate(rootDomain, { values: (window as any).INITIAL_STATE })
const scope = fork(rootDomain)


ReactDOM.hydrate(
  <BrowserRouter>
    <App root={scope}/>
  </BrowserRouter>
  , document.getElementById('root')
)



// import { loadableReady } from '@loadable/component'

// Promise.all([
//   loadableReady(),
// ])
//   .then(
//     () => {
//
//     }
//   )

