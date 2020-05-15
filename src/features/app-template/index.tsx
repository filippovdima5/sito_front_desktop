import React from 'react'
import styles from '../../media/css/app.module.scss'
import { Header } from '../header'
import { Pages } from '../../pages'
import { Footer } from '../footer'
import config from '../../config'
import BackToTop from '../../commons/molecules/back-to-top'


export function AppTemplate() {
  return (
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
  )
}
