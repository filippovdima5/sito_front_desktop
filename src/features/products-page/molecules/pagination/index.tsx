import React, { useCallback, useMemo } from 'react'
import { useStore, useEvent } from 'effector-react/ssr'
import {  $mainState, $setPage } from '../../store'
import { $totalPages } from '../../new-store'
import config from '../../../../config'
import { Arrow } from '../../../../assets/svg'
import styles from './styles.module.scss'


const handleToTop = () => {
  if (!config.ssr) document.body.scrollTo(0, 0)
}

export function Pagination() {
  const totalPages = useStore($totalPages)
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
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1)
  }, [currentPage, totalPages, setCurrentPage])
  
  
  if (totalPages <= 1) return null
  
  
  return (
    <div className={styles.Pagination}>
      <div className={styles.inner} onClick={() => handleToTop()}>
        <div className={styles.left} onClick={handlePrev}>
          <span className={`${styles.arrow} ${styles.prev}`}>
            <Arrow className={styles.arrowSvg} rotate={90}/>
          </span>
        </div>
        
        <div className={`${styles.main} ${styles.cdp}`} data-actpage={currentPage}>
          {Array.from({ length: totalPages }).map((_, i) => (
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
          <span className={`${styles.arrow} ${styles.next}`}>
            <Arrow className={styles.arrowSvg} rotate={270}/>
          </span>
        </div>
      </div>
    </div>
  )
}

