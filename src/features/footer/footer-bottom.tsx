import React from 'react'
import styled from 'styled-components'
import styles from './styles.module.scss'


export function FooterBottom() {
  return(
    <S.Wrap className={styles.footerBottom}>
      <div className={styles.wrap}>
        <div className={styles.container}>
        
          <span>© SITO
            <span className='date'> {new Date().getFullYear()}</span>
          </span>
        
          <S.Icons>
            <S.IconWrap href='https://vk.com/sito.store' target='_blank'><img src={'/icons/vk.svg'} alt='vk'/></S.IconWrap>
            <S.IconWrap href='https://www.youtube.com/channel/UCP7EyqO5XlzPZvN_39w_YNw' target='_blank'><img src={'/icons/youtube.svg'} alt='youtube'/></S.IconWrap>
            <S.IconWrap href='https://www.instagram.com/sito.store' target='_blank'><img src={'/icons/instagram.svg'} alt='instagram'/></S.IconWrap>
          </S.Icons>
        </div>
      </div>
    </S.Wrap>
  )
}

const S = {
  Wrap: styled.div`
    user-select: none;

    
    & .date {
        font-family: 'Open Sans', sans-serif;
        cursor: none;
        
    }
`,
  
  Icons: styled.div`
    margin-left: auto;
    height: 100%;
    width: 200px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    justify-content: flex-end;
`,
  
  IconWrap: styled.a`
    margin: 0 7px;
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    overflow: hidden;
    cursor: pointer;
   // border: 2px solid #727272;
    
    & img {
      display: block;
      width: 100%;
      height: 100%;
    }
`
}
