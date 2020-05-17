import React from 'react'
import { useLocation } from 'react-router'
import { useEvent } from 'effector-react/ssr'
import { SexId } from '../../types'
import { useEffectSafe } from '../../hooks/use-effect-safe'
import styles from './styles.module.scss'
import { Sorters } from './molecules/sorters'
import { Pagination } from './molecules/pagination'
import { ProductsList } from './organisms/products-list'
import { Filters } from './organisms/filters'
import { $mountProductsPage } from './new-store'


export function ProductsPage({ sexId }: { sexId: SexId }) {
  const mountProductsPage = useEvent($mountProductsPage)
  const { pathname, search } = useLocation()
  
  useEffectSafe(() => {
    mountProductsPage({ pathname, search })
  }, [sexId])
  
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

