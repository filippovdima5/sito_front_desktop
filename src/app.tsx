import React  from 'react'
import { Scope } from 'effector/fork'
import { Provider } from 'effector-react/ssr'
import { AppTemplate } from './features/app-template'
import { MetaTags } from './features/meta-tags'
import './assets/styles/reset.module.scss'
import { ListenLocation } from './features/listen-location'


export function App({ root }: { root: Scope }) {
  return(
    <Provider value={root}>
      <ListenLocation/>
      <MetaTags/>
      
      <AppTemplate/>
    </Provider>
  )
}



