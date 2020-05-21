import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { Logo } from '../../commons/atoms/logo'
import styles from './styles.module.scss'


export function FooterTop() {
  const { pathname } = useLocation()
  
  const sex = useMemo(() => {
    if (!pathname.includes('/men')) return null
    if (pathname.includes('/women')) return 'women'
    return 'men'
  }, [pathname])
  
  return(
    <S.Wrap className={styles.footerTop}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          
          <Logo color={'white'}/>
  
          <div className={styles.about}>
            <div className={styles.wrapAbout}>
              Сервис сканирует ассортимент десятков магазинов, на данный сайт
              попадают товары со скидкой от 50%. Сейчас мы усиленно работаем над
              улучшением сортировки товаров и увеличением количества магазинов партнеров.
            </div>
          </div>
          
          <S.Links>
            <Link className='link' to={!sex ? '/about' : `/${sex}/about`}>О нас</Link>
            <Link className='link' to={!sex ? '/private-office' : `/${sex}/private-office`}>Избранное</Link>
          </S.Links>
          
          
        </div>
      </div>
    </S.Wrap>
  )
}

const S = {
  Wrap: styled.div``,
  
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
