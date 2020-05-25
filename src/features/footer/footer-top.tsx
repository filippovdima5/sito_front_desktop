import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { Logo } from '../../commons/atoms/logo'
import { FooterStyled } from './styled'


export function FooterTop() {
  const { pathname } = useLocation()
  
  const sex = useMemo(() => {
    if (!pathname.includes('/men')) return null
    if (pathname.includes('/women')) return 'women'
    return 'men'
  }, [pathname])
  
  return(
    <S.Wrap>
      <FooterStyled.Wrap>
        <FooterStyled.Container>
          
          <Logo color={'white'}/>
  
          <S.About>
            <S.AboutContainer>
              Сервис сканирует ассортимент десятков магазинов, на данный сайт
              попадают товары со скидкой от 50%. Сейчас мы усиленно работаем над
              улучшением сортировки товаров и увеличением количества магазинов партнеров.
            </S.AboutContainer>
          </S.About>
          
          <S.Links>
            <Link className='link' to={!sex ? '/about' : `/${sex}/about`}>О нас</Link>
            <Link className='link' to={!sex ? '/private-office' : `/${sex}/private-office`}>Избранное</Link>
          </S.Links>
          
          
        </FooterStyled.Container>
      </FooterStyled.Wrap>
    </S.Wrap>
  )
}

const S = {
  Wrap: styled.div`
      background-color: #272727;
      padding: 22px 0 33px;
`,
  
  About: styled.div`
    width: 50%;
    font-size: 0.875rem;
    line-height: 1.5;
    margin: 0 10px 0 20px;
`,
  
  AboutContainer: styled.div`
      width: 92%;
      color: white !important;
`,
  
  Links: styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
      color: white !important;
    
    & .link {
      height: 33%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: 5px;
      color: white !important;
    }
    
    & .link:hover {
      text-decoration: underline;
    }
`
}
