import React from 'react'
import { useEvent } from 'effector-react/ssr'
import styles from './styles.module.scss'
import {  $setModSearch } from './store'
import { Icon } from './icon'
import { Input } from './input'
import  { SearchResult } from './modal'


export function Search() {
  const setModSearch = useEvent($setModSearch)
  
  return (
    <div
      onClick={() => setModSearch()}
      className={`${styles.Search} ${styles.search_active}`}
    >
      <Icon/>
      <Input/>
      <SearchResult/>
    </div>
  )
}
