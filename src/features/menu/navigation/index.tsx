import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useStore, useEvent } from 'effector-react/ssr'
import { $setNavActive, $setMenuContent, $setForceClose } from '../store'
import { $genderInfo, $setGender } from '../../../stores/user'
import { $baseRoute } from '../../../stores/env'
import { useMouseOpenMenu } from '../hooks/use-mouse-open-menu'
import { sexIdToStr } from '../../../helpers/lib'
import styles from './styles.module.scss'


function ActiveBorder({ active }: { active: boolean }) {
  if (!active) return null
  return (<div className={styles.activeBorder}/>)
}

export function Navigation() {
  useMouseOpenMenu(200)
  const genderInfo = useStore($genderInfo)
  const baseRoute = useStore($baseRoute)
  const setNavActive = useEvent($setNavActive)
  const setMenuContent = useEvent($setMenuContent)
  const setGender = useEvent($setGender)
  const setForceClose = useEvent($setForceClose)
  
  
  const sexId = useMemo(() => {
    if (genderInfo === null) return null
    return genderInfo.sexId
  }, [genderInfo])
  

  
  return (
    <ul
      onMouseOver={() => setNavActive(true)}
      onMouseOut={() => setNavActive(false)}
      className={styles.navigation}>
      <li
        onMouseOver={() => setMenuContent('BRANDS')}
        className={styles.navItem}>
        <Link
          onClick={() => setForceClose(true)}
          to={`/brands/${sexId !== null ? sexIdToStr(sexId) : ''}`}
          className={styles.navLink}
        >
          Бренды
        </Link>
        
        <ActiveBorder active={baseRoute === 'brands'}/>
      </li>
  
  
      <li
        onMouseOver={() => setMenuContent('MEN_CATEGORIES')}
        className={styles.navItem}>
        <Link
          onClick={() => {
            setGender(1)
            setForceClose(true)
          }}
          to={'/products/men'}
          className={styles.navLink}
        >
            Мужское
        </Link>
  
        <ActiveBorder
          active={((baseRoute === 'products') && (sexId === 1))}/>
      </li>
        
        
      <li
        onMouseOver={() => setMenuContent('WOMEN_CATEGORIES')}
        className={styles.navItem}>
        <Link
          onClick={() => {
            setGender(2)
            setForceClose(true)
          }}
          to={'/products/women'}
          className={styles.navLink}
        >
            Женское
        </Link>
  
        <ActiveBorder
          active={((baseRoute === 'products') && (sexId === 2))}/>
      </li>
      
    </ul>
  )
}
