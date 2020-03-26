import React, { FC } from 'react'
import { filtersName } from '../../organisms/filters/constants'
import { ItemFiltersList } from '../../organisms/filters/types'
import { ListFilter } from '../../organisms/filters/molecules/list-filter'
import styles from './styles.module.scss'




const Filter: FC<ItemFiltersList> = (props) => (
  <div className={styles.filter}>
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>{filtersName[props.name]}</span>
      </div>
        
      <div className={styles.body}>
        {props.children}
      </div>
    </div>
  </div>
)

function FilterController(props: ItemFiltersList) {
  switch (props.type) {
    case 'bool': return(
      <div>boll</div>
    )
    case 'range': return (
      <Filter {...props}>Range</Filter>
    )
    default: return (
      <Filter {...props}>
        <ListFilter nameFilter={props.name} />
      </Filter>
    )
  }
}




export { FilterController as Filter }
