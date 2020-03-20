import React, { useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'

import { useStore, useEvent } from 'effector-react/ssr'
import { $searchResult, $showResults, $setModSearch } from '../store'
import { $genderInfo } from '../../../stores/user'


import styles from './styles.module.scss'



function  SearchResult() {
  const modalSearchRef = useRef<HTMLDivElement | null>(null)
  const searchResults = useStore($searchResult)
  const genderInfo = useStore($genderInfo)
  
  const setModSearch = useEvent($setModSearch)



  useEffect(() => {
    disableBodyScroll(modalSearchRef.current as NonNullable<HTMLDivElement>)
    return (() => {
      clearAllBodyScrollLocks()
    })
  }, [])
  
  
  const sexLine = useMemo(() => {
    if (genderInfo === null) return ''
    if (genderInfo.sexLine === null) return ''
    return genderInfo.sexLine
  }, [genderInfo])


  return (
    <div
      ref = {modalSearchRef}
      className={styles.modal}
    >
      <div   className={styles.modalBody}>
        <ul className={styles.list}>
          
          {searchResults.map(({ count, title }) => (
            <li key={title} className={styles.title}>
              <Link
                onClick={() => {
                  setModSearch()
                }}
                to={`/products/${sexLine}?brands=${title}`}
                className={styles.link}
              >
                {title}
                
                <span>
                  <span className={styles.count}>{count}</span>
                </span>
                
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}


function ShowResults() {
  const showResults = useStore($showResults)
  if (!showResults) return null


  return <SearchResult/>
}


export { ShowResults as SearchResult }

