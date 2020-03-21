import React from 'react'
import styles from './styles.module.scss'


export function Sorters() {
  return (
    <div className={styles.sorters}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.title}>
							Сортировать по:
          </span>
        </div>
        
        <div className={styles.body}>
          <div className={styles.sort_btn}>
            <button className={styles.btn}>По новизне</button>
            <button className={styles.btn}>По цене</button>
            <button className={styles.btn}>По скидке</button>
          </div>
        </div>
      </div>
    </div>
  )
}
