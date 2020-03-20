import React  from 'react'

import { Scope } from 'effector/fork'
import { Provider , useEvent, useStore } from 'effector-react/ssr'
import { useLocation } from 'react-router'
import { Helmet } from 'react-helmet'
import { useEffectSafe } from './helpers/hooks/use-effect-safe'


import config from './config'
import { $fetchUser, $genderInfo } from './stores/user'
import { $setUrlInfo, $seo, $setLoadPopularBrands } from './stores/env'
import { Pages } from './pages'

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
  const fetchUser = useEvent($fetchUser)
  const setUrlInfo = useEvent($setUrlInfo)
  const setLoadPopularBrands = useEvent($setLoadPopularBrands)
  
  useEffectSafe(() => {
    setLoadPopularBrands({ sexId: genderInfo === null ? null : genderInfo.sexId })
  }, [genderInfo])
  
  useEffectSafe(() => {
    if (config.local) {
      fetchUser()
    }
  }, [])
  
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
    
        <main className={styles.main}>
          <Pages/>
        </main>
    
        <footer className={styles.footer}>
          footer
        </footer>
    
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



