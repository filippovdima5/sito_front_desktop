import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import config from '../../../config'


const FPS = 3
const getScrollTop = () => config.ssr ? 0 : window.document.body.scrollTop

const scrollToTop = () => {
  const top = getScrollTop()
  if (top <= 0 || config.ssr) return
  
  const delta = Math.max(10, top / FPS)
  
  window.document.body.scrollTo(0, Math.max(top - delta, 0))
  requestAnimationFrame(scrollToTop)
}

const BackToTop: React.FC = () => {
  const [show, setShow] = useState(false)
  
  useEffect(() => {
    const handler = () => {
      const top = getScrollTop()
      setShow(top > 250)
    }
    window.document.body.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  
  
  if (config.ssr) return null
  return(
    <div>
      <div
        style={{ display: show ? 'block' : 'none' }}
        role="button"
        onClick={scrollToTop}
        className={styles.wrap}
      >
        <div className={styles.arrow}/>
      </div>
    </div>
  )
}

export default React.memo(BackToTop)
