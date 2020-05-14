import React  from 'react'

import { Scope } from 'effector/fork'
import { Provider , useEvent, useStore } from 'effector-react/ssr'
import { useLocation } from 'react-router'
import { Helmet } from 'react-helmet'
import { useEffectSafe } from './hooks/use-effect-safe'


import config from './config'
import {  $genderInfo } from './stores/user'
import { $setUrlInfo, $seo, $setLoadPopularBrands } from './stores/env'
import { Pages } from './pages'
import { Footer } from './features/footer'

import { Header } from './features/header'
import BackToTop from './commons/molecules/back-to-top'
import styles from './media/css/app.module.scss'
import './media/css/reset.module.scss'


interface Props {
  root: Scope,
}


function Main() {
  const { pathname, search } = useLocation()
  const { title, description } = useStore($seo)
  const genderInfo = useStore($genderInfo)
  const setUrlInfo = useEvent($setUrlInfo)
  const setLoadPopularBrands = useEvent($setLoadPopularBrands)
  
  useEffectSafe(() => {
    setLoadPopularBrands({ sexId: genderInfo === null ? null : genderInfo.sexId })
  }, [genderInfo])
  

  
  useEffectSafe(() => {
    setUrlInfo({ path: pathname, search })
  }, [ pathname, search ])
  
  
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta
          name="description"
          content={description}
        />
      </Helmet>
  
  
      <div className={styles.app}>
        <header className={styles.header}>
          <Header/>
        </header>
        
        
        <div className={styles.container}>
          <main className={styles.main}>
            <Pages/>
          </main>
  
          <footer className={styles.footer}>
            <Footer/>
          </footer>
        </div>
    
        {!config.ssr && <BackToTop/>}
      </div>
    </>
  )
}



export function App({ root }: Props) {
  return(
    <Provider value={root}>
      <Main/>
    </Provider>
  )
}



