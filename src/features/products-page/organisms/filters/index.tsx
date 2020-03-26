import React from 'react'
import { useStore } from 'effector-react/ssr'
import { Filter } from '../../molecules/filter'
import styles from './styles.module.scss'
import { $filtersView } from './store'


export function Filters () {
  const filtersView = useStore($filtersView)
  
  return (
    <div className={styles.filters}>
      <div className={styles.container}>
        
        {filtersView.map(filter => (
          <Filter key={filter.name} {...filter}/>
        ))}
        
      </div>
    </div>
  )
}
