import React from 'react'
import { Close, Arrow } from '../../../../../../media/img/svg/icons'
import styles from './styles.module.scss'



type Props = {
  title: string,
  type: 'close' | 'back',
  event: () => void,
}

export function Header({ title, type, event }: Props) {
  return (
    <div className={styles.header}>
      <div className={styles.headerWrap}>

        {type === 'back' &&
        <div onClick={event} className={`${styles.btn} ${styles.btn_left}`}>
          <Arrow />
        </div>
        }


        <div className={styles.titleWrap}>
          <div className={styles.title}>{title}</div>
        </div>
        
        
        {type === 'close' &&
        <div onClick={event} className={`${styles.btn} ${styles.btn_right}`}>
          <Close fill={'rgba(0,0,0,.4)'}/>
        </div>}

      </div>
    </div>
  )
}
