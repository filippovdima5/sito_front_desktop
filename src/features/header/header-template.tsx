import React from 'react'
import { Navigation } from '../menu'
import { HiddenNavigation } from '../menu/hidden-navigation'
import styles from './styles.module.scss'

import { Logo } from './atoms/logo'


export function HeaderTemplate() {
  return(
    <div className={styles.header}>
      <div className={styles.headerInner}>
        
        <div className={styles.logo}>
          <Logo/>
        </div>
        
        <nav className={styles.nav}>
          <Navigation/>
          <HiddenNavigation/>
        </nav>
        
        <div className={styles.search}>
          search
        </div>
        
      </div>
    </div>
  )
}
