import React from 'react'
import config from '../../../config'
import styles from './styles.module.scss'


type Props = {
  classNameRing?: string,
  classNameBall?: string,
}


export function Loader(props: Props) {
  if (config.ssr) return null
  
  return(
    <div className={styles.loader}>
      <div className={styles.filter}/>
      
      <div className={styles.wrap}>
        <div className={`${styles.ring} ${props.classNameRing ?? ''}`}>
          <div className={`${styles.ballHolder} ${props.classNameBall ?? ''}`}>
            <div className={styles.ball}/>
          </div>
        </div>
      </div>
    </div>
  )
}
