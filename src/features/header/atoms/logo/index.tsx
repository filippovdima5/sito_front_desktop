import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from 'effector-react/ssr'
import { $genderInfo } from '../../../../stores/user'
import styles from './styles.module.scss'


export function Logo() {
  const genderInfo = useStore($genderInfo)
  const sexLine = useMemo(() => {
    if (genderInfo === null) return ''
    return genderInfo.sexLine
  }, [genderInfo])
  
  
  return (
    <Link className={styles.logo} to={`/home/${sexLine}`}>
      <span className={styles.text}>
        Sito
      </span>
    </Link>
  )
}

