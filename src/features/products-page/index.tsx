import React, { useRef } from 'react'
import { useHistory } from 'react-router'
import {  useEvent } from 'effector-react/ssr'
import { useEffectSafe } from '../../hooks/use-effect-safe'
import styles from './styles.module.scss'
import {  $toggleSex, $initRouteHistory } from './store'
import { Sorters } from './molecules/sorters'
import { Pagination } from './molecules/pagination'
import { ProductsList } from './organisms/products-list'
import { Filters } from './organisms/filters'


type Props = {
  sexId: 1 | 2,
}

export function ProductsPage({ sexId }: Props) {
  const history = useHistory()
  const prevSexId = useRef<Props['sexId']>(sexId)
  
  const toggleSex = useEvent($toggleSex)
  const initRouteHistory = useEvent($initRouteHistory)
  
  useEffectSafe(() => {
    if (sexId !== prevSexId.current ) toggleSex(sexId)
    prevSexId.current = sexId
  }, [ sexId ])
  
  
  useEffectSafe(() => {
    initRouteHistory(history)
  }, [])
  
  
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

