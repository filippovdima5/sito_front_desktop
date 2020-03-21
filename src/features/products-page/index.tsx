import React from 'react'
import styles from './styles.module.scss'
import { Sorters } from './molecules/sorters'
import { Pagination } from './molecules/pagination'


export function ProductsPage({ sexId }: { sexId: 1 | 2 }) {
  return (
    <div className={styles.products}>
      <div className={styles.grid}>
        
        <div className={styles.sorters}>
          <Sorters/>
        </div>
        
        <div className={styles.productsList}>
          productsList
        </div>
        
        <div className={styles.filters}>
          filters
        </div>
        
        <div className={styles.pagination}>
          <Pagination/>
        </div>
        
      </div>
    </div>
  )
}

