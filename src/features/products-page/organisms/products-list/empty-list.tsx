import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router'
import { useEvent } from 'effector-react/ssr'
import styles from '../../../../assets/styles/info-page.module.scss'
import { Button1 } from '../../../../commons/atoms'
import { $mountProductsPage } from '../../new-store'
import { SexId } from '../../../../types'



export function EmptyList() {
  const { pathname } = useLocation()
  const mountProductsPage = useEvent($mountProductsPage)
  
  return (
    <div className={styles.wrap}>
      <div>
        <div className={styles.container}>
          <div className={styles.title}>К сожалению, по вашему запросу ничего не найдено</div>
          <div className={styles.body}>
            <span>
              Попробуйте отменить несколько фильтров, чтобы посмотреть больше товаров
            </span>
          </div>
        
          <div className={styles.buttons}>
        
            <S.LinkWrap className={styles.link}>
              <Button1
                href={pathname}
                onClick={() => mountProductsPage({ pathname, search: '?' })}
                className='button'
              >
                Сбросить все фильтры
              </Button1>
            </S.LinkWrap>
     
          </div>
        </div>
      </div>
    </div>
  )
}


const S = {
  LinkWrap: styled.div`
    
    & .button {
      background-color: #272727;
      border: transparent;
      color: white
    }
`
}

