import React from 'react'
import { SexId } from '../../types'
import styles from './styles.module.scss'
import { Sorters } from './molecules/sorters'
import { Pagination } from './molecules/pagination'
import { ProductsList } from './organisms/products-list'
import { Filters } from './organisms/filters'



export function ProductsPage({ sexId }: { sexId: SexId }) {
  return (
    <div className={styles.products}>
      <div className={styles.grid}>
        
        <div className={styles.sorters}>
          <Sorters/>
        </div>
        
        <div className={styles.productsList}>
          <ProductsList/>
        </div>
        
        <div className={styles.filters}>
          <Filters/>
        </div>
        
        <div className={styles.pagination}>
          <Pagination/>
        </div>
        
      </div>
    </div>
  )
}

