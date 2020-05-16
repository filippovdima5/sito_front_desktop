import React, { useMemo } from 'react'
import { Link , useLocation } from 'react-router-dom'
import { useStore, useEvent } from 'effector-react/ssr'
import styled from 'styled-components'
import { $setNavActive, $setMenuContent, $setForceClose, $menuContent, MenuContent } from '../store'
import { useMouseOpenMenu } from '../hooks/use-mouse-open-menu'


const config: Array<{ title: string, content: MenuContent, url: string }> = [
  { title: 'Мужское', content: 'MEN_CATEGORIES', url: '/men/products' },
  { title: 'Женское', content: 'WOMEN_CATEGORIES', url: '/women/products' }
]


function BrandItem({ pathname }: { pathname: string }) {
  const menuContent  = useStore($menuContent)
  const setMenuContent = useEvent($setMenuContent)
  const setForceClose = useEvent($setForceClose)
  
  
  const sex = useMemo(() => {
    if (pathname.includes('/men')) return 'men'
    if (pathname.includes('/women')) return  'women'
    return null
  }, [ pathname ])
  
  
  const url = useMemo(() => `/${sex}/brands`, [sex])
  
  if (sex === null) return null
  
  return (
    <S.NavItem onMouseOver={() => setMenuContent('BRANDS')}>
      <Link onClick={() => setForceClose(true)} className='link' to={url}>
        Бренды
      </Link>
      <S.ActiveBorder
        hover={menuContent === 'BRANDS'}
        active={pathname === url}
      />
    </S.NavItem>
  )
}


export function Navigation() {
  useMouseOpenMenu(200)
  const setNavActive = useEvent($setNavActive)
  const setMenuContent = useEvent($setMenuContent)
  const setForceClose = useEvent($setForceClose)
  const menuContent  = useStore($menuContent)
  const { pathname } = useLocation()
  
  
  return (
    <S.Navigation
      onMouseOver={() => setNavActive(true)}
      onMouseOut={() => setNavActive(false)}>
      
      
      <BrandItem pathname={pathname}/>
      
      {config.map(({ title, url, content }) => (
        <S.NavItem key={title} onMouseOver={() => setMenuContent(content)}>
          <Link onClick={() => setForceClose(true)} className='link' to={url}>
            {title}
          </Link>
          <S.ActiveBorder
            hover={menuContent === content}
            active={pathname === url}
          />
        </S.NavItem>
      ))}
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
