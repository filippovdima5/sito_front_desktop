import React from 'react'
import { filtersName } from '../../constants'
import { FiltersTypes } from '../../organisms/filters/types'
import styles from './styles.module.scss'


type Props = {
  indexFilter: keyof typeof filtersName,
  filterType: FiltersTypes,
  data: Array<string> | Array<number> | [number, number] | boolean | null,
}


function Filter({ indexFilter }: Props ) {
  return (
    <div className={styles.filter}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.title}>{filtersName[indexFilter]}</span>
        </div>
        
        <div className={styles.body}>
          body
        </div>
      </div>
    </div>
  )
}

function FilterController(props: Props) {
  if (props.filterType === 'bool') {
    return(
      <div>{filtersName[props.indexFilter]}</div>
    )
  } else {
    return <Filter {...props}/>
  }
}




export { FilterController as Filter }
