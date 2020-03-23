import React from 'react'
import { Filter } from '../../molecules/filter'
import styles from './styles.module.scss'


export function Filters () {
  return (
    <div className={styles.filters}>
      <div className={styles.container}>
      
      
        {Array.from({ length: 4 }).map((_, index) => (
          <Filter key={index.toString()}/>
        ))}
      
      </div>
    </div>
  )
}
