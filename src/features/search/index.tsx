import React from 'react'
import { useEvent } from 'effector-react/ssr'
import { $setModSearch } from './store'
import styles from './styles.module.scss'
import { Icon } from './icon'
import { Input } from './input'
import  { SearchResult } from './modal'


export function Search() {
  const setModSearch = useEvent($setModSearch)
  
  return (
    <div
      onMouseOver={() => {setModSearch(true)}}
      onMouseLeave={() => setModSearch(false)}
      className={styles.search}>
      <div className={styles.searchContent}>
        <div className={styles.searchInput}>
          <Icon/>
          <Input/>
        </div>
        <SearchResult/>
      </div>
    </div>
  )
}
