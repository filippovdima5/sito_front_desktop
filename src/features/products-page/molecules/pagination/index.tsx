import React, { useCallback, useMemo } from 'react'
import { useStore, useEvent } from 'effector-react/ssr'
import { $productsInfoStore, $mainState, $setPage } from '../../store'
import styles from './styles.module.scss'


export function Pagination() {
  const { total_pages } = useStore($productsInfoStore)
  const { page } = useStore($mainState)
  const setCurrentPage = useEvent($setPage)
  
  const currentPage = useMemo(() => {
    if (page === null) return 1
    return page
  }, [page])

  
  const handlePrev = useCallback(() => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }, [ currentPage, setCurrentPage ])
  
  const handleNext = useCallback(() => {
    if (currentPage < total_pages - 1) setCurrentPage(currentPage + 1)
  }, [currentPage, total_pages, setCurrentPage])
  
  
  
  return (
    <div className={styles.Pagination}>
      <div className={styles.inner}>
        <div className={styles.left} onClick={handlePrev}>
          <span className={`${styles.arrow} ${styles.prev}`}/>
        </div>
        
        <div className={`${styles.main} ${styles.cdp}`} data-actpage={currentPage}>
          {Array.from({ length: total_pages }).map((_, i) => (
            <span
              onClick={() => setCurrentPage(i+1)}
              data-page = {i}
              className={`${styles.cdp_i} ${styles.numeric} ${i+1 === currentPage && styles.is_active}`}
              key={i}
            >
              {i + 1}
            </span>
          ))}
        </div>
      
        <div className={styles.right} onClick={handleNext}>
          <span className={`${styles.arrow} ${styles.next}`}/>
        </div>
      </div>
    </div>
  )
}

