import React, {  useMemo, useRef } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useHistory } from 'react-router'
import { useStore, useEvent } from 'effector-react/ssr'
import { useTransitionNames } from '../../../hooks/use-transition-names'
import { $searchResult, $showResults, $setModSearch } from '../store'
import { $genderInfo } from '../../../stores/user'


import styles from './styles.module.scss'



function  SearchResult() {
  const modalSearchRef = useRef<HTMLDivElement | null>(null)
  const searchResults = useStore($searchResult)
  const genderInfo = useStore($genderInfo)
  const setModSearch = useEvent($setModSearch)
  const { push } = useHistory()
  
  
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
              <div
                onClick={() => {
                  setModSearch(false)
                  push(`/products/${sexLine}?brands=${title}`)
                }}
                className={styles.link}
              >
                {title}
                
                <span>
                  <span className={styles.count}>{count}</span>
                </span>
                
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ShowModal() {
  const showResults = useStore($showResults)
  const classNames = useTransitionNames(styles)
  
  return (
    <TransitionGroup>
      {showResults && (
        <CSSTransition
          timeout={200}
          classNames={classNames}
        >
          <SearchResult/>
        </CSSTransition>
      )}
    </TransitionGroup>
  )
}

export { ShowModal as SearchResult }




