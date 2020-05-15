import React from 'react'
import { Link , useLocation } from 'react-router-dom'
import { useStore, useEvent } from 'effector-react/ssr'
import styled from 'styled-components'
import {$setNavActive, $setMenuContent, $setForceClose, $menuContent, MenuContent} from '../store'
import { $setGender } from '../../../stores/user'
import { useMouseOpenMenu } from '../hooks/use-mouse-open-menu'


const config: Array<{ title: string, content: MenuContent, url: string }> = [
  { title: 'Бренды', content: 'BRANDS', url: '/brands' },
  { title: 'Мужское', content: 'MEN_CATEGORIES', url: '/men/products' },
  { title: 'Женское', content: 'WOMEN_CATEGORIES', url: '/women/products' }
]


export function Navigation() {
  useMouseOpenMenu(200)
  const setNavActive = useEvent($setNavActive)
  const setMenuContent = useEvent($setMenuContent)
  const setGender = useEvent($setGender)
  const setForceClose = useEvent($setForceClose)
  const menuContent  = useStore($menuContent)
  const { pathname } = useLocation()
  
  

  
  return (
    <S.Navigation
      onMouseOver={() => setNavActive(true)}
      onMouseOut={() => setNavActive(false)}>
      <S.NavItem
        onMouseOver={() => setMenuContent('BRANDS')}>
        <Link
          onClick={() => setForceClose(true)}
          to={'/brands'}
          className='link'
        >
          Бренды
        </Link>
        
        <S.ActiveBorder
          hover={menuContent === 'BRANDS'}
          active={pathname.includes('/brands')}/>
      </S.NavItem>
  
  
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
      
    </S.Navigation>
  )
}


const S = {
  Navigation: styled.ul`
      display: flex;
      flex-direction: row;
      height: 100%;
      box-sizing: border-box;
      
      & .link {
      height: 100%;
      box-sizing: border-box;
      color: #272727;
      font-size: 18px;
      font-weight: 500;
      line-height: 1.67;
      text-transform: uppercase;
      position: relative;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
      align-items: center;
      -ms-flex-pack: center;
      justify-content: center;
      text-decoration: none;
      padding: 0 17px;
      }
`,
  
  
  NavItem: styled.li`
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
