import React from 'react'
import styles from './styles.module.scss'
import config from '../../../config'

export function Loader() {
  if (config.ssr) return null
  
  return(
    <div className={styles.loader}>
      <div className={styles.filter}/>
      
      <div className={styles.wrap}>
        <div className={styles.ring}>
          <div className={styles.ballHolder}>
            <div className={styles.ball}/>
          </div>
        </div>
      </div>
    </div>
  )
}
