import React, { useMemo } from 'react'
import { Link , useLocation } from 'react-router-dom'
import { useStore, useEvent } from 'effector-react/ssr'
import { $setNavActive, $setMenuContent, $setForceClose, $menuContent } from '../store'
import { $genderInfo, $setGender } from '../../../stores/user'
import { useMouseOpenMenu } from '../hooks/use-mouse-open-menu'
import { sexIdToStr } from '../../../lib'
import styles from './styles.module.scss'
import styled from 'styled-components'



export function Navigation() {
  useMouseOpenMenu(200)
  const genderInfo = useStore($genderInfo)
  const setNavActive = useEvent($setNavActive)
  const setMenuContent = useEvent($setMenuContent)
  const setGender = useEvent($setGender)
  const setForceClose = useEvent($setForceClose)
  const menuContent  = useStore($menuContent)
  const { pathname } = useLocation()
  
  
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
        
        <S.ActiveBorder
          hover={menuContent === 'BRANDS'}
          active={pathname.includes('/brands')}/>
      </li>
  
  
      <li
        onMouseOver={() => setMenuContent('MEN_CATEGORIES')}
        className={styles.navItem}>
        <Link
          onClick={() => {
            setGender(1)
            setForceClose(true)
          }}
          to={'/men/products'}
          className={styles.navLink}
        >
            Мужское
        </Link>
  
        <S.ActiveBorder
          hover = {menuContent === 'MEN_CATEGORIES'}
          active={pathname.includes('/men/products') && !pathname.includes('/women/products')}/>
      </li>
        
        
      <li
        onMouseOver={() => setMenuContent('WOMEN_CATEGORIES')}
        className={styles.navItem}>
        <Link
          onClick={() => {
            setGender(2)
            setForceClose(true)
          }}
          to={'/women/products'}
          className={styles.navLink}
        >
            Женское
        </Link>
  
        <S.ActiveBorder
          hover = {menuContent === 'WOMEN_CATEGORIES'}
          active={pathname.includes('/women/products')}/>
      </li>
      
    </ul>
  )
}


const S = {
  ActiveBorder: styled.div<{ active: boolean, hover: boolean }>`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 4px;
    left: 0;
    right: 0;
    background-color: rgba(6, 10, 15, 1);
    
    visibility: ${({ active, hover }) => (!active && !hover) ? 'hidden' : 'visible'};
`
}
