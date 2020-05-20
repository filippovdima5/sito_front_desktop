import React, { useMemo } from 'react'
import { Link , useLocation } from 'react-router-dom'
import { findSexInPath } from '../../../lib'
import styles from './styles.module.scss'


export function Logo({ color }: { color: string }) {
  const { pathname } = useLocation()
  
  const url = useMemo(() => {
    const sex = findSexInPath(pathname)
    if (sex === null) return '/'
    return `/${sex}/home`
  }, [pathname])
  
  
  return (
    <Link style={{ color }} className={styles.logo} to={url}>
      <span className={styles.text}>
        Sito
      </span>
    </Link>
  )
}
