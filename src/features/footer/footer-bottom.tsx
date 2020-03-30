import React from 'react'
import styles from './styles.module.scss'


export function FooterBottom() {
  return(
    <div className={styles.footerBottom}>
      <div className={styles.wrap}>
        <div className={styles.container}>
        
          <span>© SITO
            <span> {new Date().getFullYear()}</span>
          </span>
        
        </div>
      </div>
    </div>
  )
}
