import React, {  useMemo, useRef } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useLocation } from 'react-router'
import { useStore, useEvent } from 'effector-react/ssr'
import { Link } from 'react-router-dom'
import { useTransitionNames } from '../../../hooks/use-transition-names'
import { $searchResult,  $setModSearch, $modSearch } from '../store'
import { findSexIdInPathNotStrict, sexIdToStr } from '../../../lib'
import { $mountProductsPage } from '../../products-page/store'
import styles from './styles.module.scss'


function  SearchResult() {
  const modalSearchRef = useRef<HTMLDivElement | null>(null)
  const mountProductsPage = useEvent($mountProductsPage)
  const searchResults = useStore($searchResult)
  const setModSearch = useEvent($setModSearch)
  
  const { pathname } = useLocation()
  const sexId = useMemo(() => findSexIdInPathNotStrict(pathname), [pathname])

  

  
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
                to={sexId ? `/${sexIdToStr(sexId)}/products?brands=${title}` : `/women/products?brands=${title}`}
                onClick={() => {
                  setModSearch({ mod: false, sex_id: sexId })
                  mountProductsPage({ pathname: (sexId ? `/${sexIdToStr(sexId)}` : '/women' ), search: `?brands=${title}` })
                }}
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

function ShowModal() {
  const modSearch = useStore($modSearch)
  const classNames = useTransitionNames(styles)
  
  return (
    <TransitionGroup>
      {modSearch && (
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




