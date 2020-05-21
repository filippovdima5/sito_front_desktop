import React from 'react'
import styles from '../../../assets/styles/info-page.module.scss'
import { Heart } from '../../../assets/svg'
import { Button1 } from '../../../commons/atoms'
import styled from 'styled-components'


const links = [
  { link: 'men', title: 'Мужское' },
  { link: 'women', title: 'Женское' },
] as const


export function EmptyPage() {
  return (
    <S.Wrap className={styles.wrap}>
      <div>
        <div className={styles.container}>
          <div style={{ backgroundImage: 'url("/assets/like-image.svg")' }} className={`${styles.img}`}/>
          <div className={styles.title}>Не найдено</div>
          <div className={styles.body}>
            <span>
              Нажимайте на кнопку
              <span className={styles.span}>
                <Heart className='heart'/>
              </span>
              , чтобы сохранять товары в избранные
            </span>
          </div>
        
          <div className={styles.buttons}>
            {links.map(({ link, title }) => (
              <Button1
                key={link}
                className={styles.link}
                href={`/${link}/products`}
              >{title}</Button1>
            ))}
          </div>
        </div>
      </div>
    </S.Wrap>
  )
}

const S = {
  Wrap: styled.div`
    & .heart {
      transform: translate(2%, 10%) !important;
    }
`
}
