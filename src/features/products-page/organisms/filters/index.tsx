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
        
        {Object.values(filtersView).map(({ type, data, name }) => (
          <Filter key={name.toString()} data={data} indexFilter={name} filterType={type}/>
        ))}
        
      </div>
    </div>
  )
}
