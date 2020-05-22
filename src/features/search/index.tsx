import React, { useMemo } from 'react'
import { useEvent } from 'effector-react/ssr'
import { useLocation } from 'react-router'
import { findSexIdInPathNotStrict } from '../../lib'
import { $setModSearch } from './store'
import styles from './styles.module.scss'
import { Icon } from './icon'
import { Input } from './input'
import  { SearchResult } from './modal'


export function Search() {
  const setModSearch = useEvent($setModSearch)
  
  const { pathname } = useLocation()
  const sexId = useMemo(() => findSexIdInPathNotStrict(pathname), [pathname])
  
  return (
    <div
      onMouseOver={() => {setModSearch({ sex_id: sexId, mod: true })}}
      onMouseLeave={() => {setModSearch({ sex_id: sexId, mod: false })}}
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
