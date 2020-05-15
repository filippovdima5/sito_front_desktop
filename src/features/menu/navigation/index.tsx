import React from 'react'
import { Link , useLocation } from 'react-router-dom'
import { useStore, useEvent } from 'effector-react/ssr'
import styled from 'styled-components'
import { $setNavActive, $setMenuContent, $setForceClose, $menuContent } from '../store'
import { $setGender } from '../../../stores/user'
import { useMouseOpenMenu } from '../hooks/use-mouse-open-menu'
import styles from './styles.module.scss'



export function Navigation() {
  useMouseOpenMenu(200)
  const setNavActive = useEvent($setNavActive)
  const setMenuContent = useEvent($setMenuContent)
  const setGender = useEvent($setGender)
  const setForceClose = useEvent($setForceClose)
  const menuContent  = useStore($menuContent)
  const { pathname } = useLocation()
  
  

  
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
          to={'/brands'}
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
  Navigation: styled.div`
      display: flex;
      flex-direction: row;
      height: 100%;
      box-sizing: border-box;
`,
  
  
  NavItem: styled.div`
    position: relative;
    margin-right: 52px;
    box-sizing: border-box;
`,
  
  
  ActiveBorder: styled.div<{ active: boolean, hover: boolean }>`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 4px;
    left: 0;
    right: 0;
    background-color: ${({ active }) => active ? 'rgba(6, 10, 15, 1)' : 'rgba(6, 10, 15, 0.3)'};
    visibility: ${({ active, hover }) => (!active && !hover) ? 'hidden' : 'visible'};
`
}
