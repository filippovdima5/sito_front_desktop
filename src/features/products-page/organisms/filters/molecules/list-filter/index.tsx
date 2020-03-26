import React  from 'react'
import { useStore } from 'effector-react/ssr'
import { FiltersItemNumber, FiltersItemString } from '../../../../../../api/types'
import { ListFilters, ListTranslateFilters } from '../../types'
import { $filtersViewRecordState, $filtersViewRecordStore } from '../../store'
import { namesCategory } from '../../../../../../constants/category-keys'
import { $genderInfo } from '../../../../../../stores/user'
import styles from './styles.module.scss'


export function ListFilter({ nameFilter }: { nameFilter: ListFilters | ListTranslateFilters }) {
  const stateData = useStore($filtersViewRecordState)[nameFilter]
  const storeData = useStore($filtersViewRecordStore)[nameFilter]
  const genderInfo = useStore($genderInfo)
  
  if (genderInfo === null) return null
  
 
  return (
    <ul className={styles.filterList}>
      {(storeData as Array<FiltersItemString | FiltersItemNumber>)
        .map(({ available, value }) => (
          <li
            key={value}
            className={`${styles.checkbox} ${!available ? styles.checkboxDis : styles.checkboxUndis}`}>
            <label className={styles.label}>
              <input
                type={'checkbox'}
                className={styles.checkboxField}
                disabled={!available}
                // @ts-ignore
                checked={stateData !== null ? stateData.includes(value) : false}
              />
              <span className={styles.icon}/>
              <span className={styles.text}>
                {nameFilter === 'categories' ? namesCategory[genderInfo?.sexId][(value as keyof typeof namesCategory['1' | '2'])] : value}
              </span>
            </label>
          </li>
        ))}
    </ul>
  )
}

