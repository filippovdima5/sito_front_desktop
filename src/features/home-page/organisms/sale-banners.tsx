import React from 'react'
import styled from 'styled-components'
import { namesCategory } from '../../../constants/category-keys'
import { Button } from '../../../ui/button'


const saleBanners = [
  { categoryId: 2001, percent: 50 },
  { categoryId: 3001, percent: 70 },
  { categoryId: 1003, percent: 85 }
]


export function SaleBanners() {
  return (
    <S.Wrap>
      {saleBanners.map(item => (
        <S.Container key={item.categoryId}>
          <S.Inner>
            <img
              className='img'
              src={`/assets/sale-banner-${item.categoryId}.jpg`}
              alt={namesCategory[1][item.categoryId as 2001]}
            />
            
            <S.ContentContainer>
              <Button className='button'>{namesCategory[1][item.categoryId as 2001]}</Button>
            </S.ContentContainer>
  
            <S.SaleInfo>
              <div className='sale'>{item.percent}%</div>
              <div className='text'>скидки</div>
            </S.SaleInfo>
            
          </S.Inner>
        </S.Container>
      ))}
    </S.Wrap>
  )
}

const S = {
  Wrap: styled.div`
    user-select: none;
    padding-top: 28px;
    display: flex;
    justify-content: space-between;
    margin: 0 -15px;
`,
  
  Container: styled.div`
      flex: 1 1 auto;
      margin: 0 15px;
`,
  
  Inner: styled.div`
    width: 100%;
    padding-bottom: 103.361345%;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    
    
    & .img{
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      display: block ;
    }
`,
  
  ContentContainer: styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    
     & .button{
      position: absolute;
      left: 20px;
      top: 23px;
    }
`,
  
  SaleInfo: styled.div`
      position: absolute;
      left: 20px;
      bottom: 23px;
      color: #FFFFFF;
      
      & .sale {
        font-family: 'Open Sans', sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 72px;
        line-height: 70px;
      }
      
      & .text{
        font-family: 'Raleway', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 28px;
        line-height: 38px;
        text-transform: uppercase;
      }
`

}

