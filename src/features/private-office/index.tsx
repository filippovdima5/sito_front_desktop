import React from 'react'
import styled from 'styled-components'
import { useBodyScrollTop } from '../../hooks/use-body-scroll-top'
import { ProductsList } from './organisms'


export function PrivateOffice() {
  useBodyScrollTop()
  
  
  return (
    <S.Wrap>
      <S.Panel>
        <div className='inner'>
          Понравившиеся товары
        </div>
      </S.Panel>
      <S.ProductsContainer>
        <div className='inner'>
          <ProductsList/>
        </div>
      </S.ProductsContainer>
    </S.Wrap>
  )
}


const S = {
  Wrap: styled.div`
    width: 100%;
`,
  
  Panel: styled.div`
    width: 100%;
    margin-bottom: 30px;


    & .inner {
      background-color: white;
      padding: 15px 20px 16px;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      align-items: center;
      height: 100%;
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
    }
`,
  
  ProductsContainer: styled.div`
    
    & .inner {
      width: 100%;
      height: 100%;
    }
`
}
