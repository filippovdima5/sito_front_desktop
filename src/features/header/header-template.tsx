import React from 'react'
import { Navigation } from '../menu'
import { HiddenNavigation } from '../menu/hidden-navigation'
import { Search } from '../search'
import styles from './styles.module.scss'

import { Logo } from '../../commons/atoms/logo'


export function HeaderTemplate() {
  return(
    <div className={styles.header}>
      <div className={styles.headerInner}>
        
        <div className={styles.logo}>
          <Logo color={'#060a0f'}/>
        </div>
        
        <nav className={styles.nav}>
          <Navigation/>
          <HiddenNavigation/>
        </nav>
        
        <div className={styles.search}>
          <Search/>
        </div>
        
      </div>
    </div>
  )
}
