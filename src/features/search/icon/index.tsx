import React from 'react'
import { SearchIcon } from '../../../assets/img/svg/icons'
import styles from './styles.module.scss'


export function Icon() {
  return (
    <div className={styles.icon}>
      <SearchIcon  fill={'rgba(0, 0, 0, 1)'} className={styles.img}/>
    </div>
  )
}
