import React from 'react'
import styled from 'styled-components'
import { Button } from '../../../ui/button'


const banner = {
  title: 'Converse',
  description: 'Конверсы давно признаны классической моделью,\n которая не оставит никого незамеченным',
  src: '/assets/brand-banner-1.jpg'
}

export function BrandBanner() {
  return (
    <S.Wrap>
      <img
        src={banner.src}
        alt={banner.title}
        className='img'
      />
      
      <S.Container>
        <S.Inner>
          <Button className='button'>Бренды</Button>
          <S.InfoContainer>
            <S.Title>{banner.title}</S.Title>
            <S.Description>
              {banner.description.split('\n').map(item => (
                <span style={{ display: 'block' }} key={item}>
                  {item}
                </span>
              ))}
            </S.Description>
          </S.InfoContainer>
        </S.Inner>
      </S.Container>
    </S.Wrap>
  )
}


const S = {
  Wrap: styled.div`
    user-select: none;
    cursor: pointer;
    padding-bottom: 33.2885%;
    box-sizing: border-box;
    position: relative;
    margin-top: 28px;
    
    & .img{
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      display: block ;
    }
`,
  
  Container: styled.div`
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    z-index: 2;
    display: flex;
    flex-flow: column;
    justify-content: center;
`,
  
  Inner: styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    
    & .button{
      position: absolute;
      left: 30px;
      top: 33px;
    }
`,
  
  
  InfoContainer: styled.div`
    position: absolute;
    top: 42.626263%;
    left: 8.540686%;
    width: 500px;
`,
  
  Title: styled.h2`
    font-family: 'Circe', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 70px;
    line-height: 70px;
    width: 100%;
    color: #000000;
    text-transform: uppercase;
`,
  
  Description: styled.p`
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    color: #272727;
`


}
