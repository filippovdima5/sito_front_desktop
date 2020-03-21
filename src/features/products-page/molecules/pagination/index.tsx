import React, { useState, useCallback } from 'react'
import styles from './styles.module.scss'


const total_page = 20


export function Pagination() {
  const [ currentPage, setCurrentPage ] = useState<number>(0)
  
  const handlePrev = useCallback(() => {
    if (currentPage > 0) setCurrentPage(currentPage - 1)
  }, [ currentPage ])
  
  const handleNext = useCallback(() => {
    if (currentPage < total_page - 1) setCurrentPage(currentPage + 1)
  }, [currentPage])
  
  


  return (
    <div className={styles.Pagination}>
      <div className={styles.inner}>
        <div className={styles.left} onClick={handlePrev}>
          <span className={`${styles.arrow} ${styles.prev}`}/>
        </div>
        
        <div className={`${styles.main} ${styles.cdp}`} data-actpage={currentPage}>
          {Array.from({ length: total_page }).map((_, i) => (
            <span
              onClick={() => setCurrentPage(i)}
              data-page = {i}
              className={`${styles.cdp_i} ${styles.numeric} ${i === currentPage && styles.is_active}`}
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

