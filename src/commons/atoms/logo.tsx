import React, { useMemo } from 'react'
import { Link , useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { findSexInPath } from '../../lib'



export function Logo({ color }: { color: string }) {
  const { pathname } = useLocation()
  
  const url = useMemo(() => {
    const sex = findSexInPath(pathname)
    if (sex === null) return '/'
    return `/${sex}/home`
  }, [pathname])
  
  
  return (
    <S.Logo style={{ color }} to={url}>
      <S.Text>Sito</S.Text>
    </S.Logo>
  )
}

const S = {
  Logo: styled(Link)`
    text-decoration: none;
    height: 100%;
    display: flex;
    align-items: center;
`,
  
  Text: styled.div`
     height: 100%;
    font-weight: 700;
    line-height: 60px;
    text-transform: uppercase;
    letter-spacing: 4.5px;

    font-size: 45px;
`
}
