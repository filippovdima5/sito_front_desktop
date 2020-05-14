import React, { useState, useRef }  from 'react'
import { useStore, useEvent } from 'effector-react/ssr'
import { useEffectSafe } from '../../../../../../hooks/use-effect-safe'
import { FiltersItemNumber, FiltersItemString } from '../../../../../../api/types'
import { ListFilters, ListTranslateFilters } from '../../types'
import { $filtersViewRecordState, $filtersViewRecordStore } from '../../store'
import { namesCategory } from '../../../../../../constants/category-keys'
import { $genderInfo } from '../../../../../../stores/user'
import { $setListFilter, $skipCurrentFilter } from '../../../../store'
import { Input } from '../../../../../../commons/atoms/input'
import { BtnHelp } from '../../atoms/btn-help'
import styles from './styles.module.scss'


type SearchProps = {
  name: ListFilters | ListTranslateFilters,
  value: string,
  setSearch: (phrase: string) => void,
}

function Search({ name, setSearch, value }: SearchProps) {
  if (name === 'categories') return null
  return (
    <div className={styles.search}>
      <Input
        value={value}
        onChange={(event: any) => setSearch(event.currentTarget.value)}
        type={'text'}
        placeholder={'Поиск'}
      />
    </div>
  )
}


export function ListFilter({ nameFilter }: { nameFilter: ListFilters | ListTranslateFilters }) {
  const stateData = useStore($filtersViewRecordState)[nameFilter]
  const storeData = useStore($filtersViewRecordStore)[nameFilter]
  const genderInfo = useStore($genderInfo)
  const setListFilter = useEvent($setListFilter)
  const skipCurrentFilter = useEvent($skipCurrentFilter)
  
  const [searchPhrase, setSearchPhrase] = useState<string>('')
  const [filteredData, setFilteredData] = useState<Array<FiltersItemString | FiltersItemNumber>>([])
  
  
  const refStoreData = useRef(storeData)
  useEffectSafe(() => {
    if (storeData.length > 0 && refStoreData.current.length === 0) setFilteredData(storeData)
  }, [storeData])
  
  useEffectSafe(() => {
    const newData = (storeData as Array<FiltersItemString | FiltersItemNumber>)
      .filter(({ value }) => {
        if (!value) return false
        return value.toString().includes(searchPhrase)
      })
    
    setFilteredData(newData)
  }, [searchPhrase])
  

  if (genderInfo === null) return null
  
  
 
  return (
    <>
      <Search
        setSearch={setSearchPhrase}
        value={searchPhrase}
        name={nameFilter}/>
      
      <ul className={styles.filterList}>
        {filteredData
          .map(({ available, value }) => (
            <li
              key={value}
              className={`${styles.checkbox} ${!available ? styles.checkboxDis : styles.checkboxUndis}`}>
              <label
                onClick={() => {
                  if (!available ) setListFilter({ key: nameFilter, value })
                }}
                className={styles.label}>
                <input
                  onClick={() => setListFilter({ key: nameFilter, value })}
                  type={'checkbox'}
                  className={styles.checkboxField}
                  disabled={!available}
                  readOnly
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
      
      <div className={styles.skipThisFilter}>
        <BtnHelp
          visible={(stateData !== null && stateData.length > 0)}
          title={'Сбросить фильтр'}
          onClick={() => skipCurrentFilter({ key: nameFilter })}
        />
      </div>
    </>
  )
}

