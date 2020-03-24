import React from 'react'
import { useEvent, useStore } from 'effector-react/ssr'
import { sortersName } from '../../constants'
import { $setSort, $mainState } from '../../store'
import { TypesSortProducts } from '../../../../api/types'
import styles from './styles.module.scss'


export function Sorters() {
  const { sort } = useStore($mainState)
  const setSort = useEvent($setSort)
  
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
            {Object.entries(sortersName).map(([key, value]) => (
              <button
                onClick={() => setSort((key as TypesSortProducts))}
                key={key}
                className={sort === key ? styles.btnActive : styles.btn}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
