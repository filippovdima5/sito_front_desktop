import React from 'react'
import styled from 'styled-components'
import { useStore } from 'effector-react/ssr'
import { $allFields } from '../products-page/new-store'
import { BrandsFilter, CategoriesFilter, SizesFilter, RangeFilter } from './organisms'


export function Filters () {
  const { price_from, price_to, sale_to, sale_from } = useStore($allFields)
  
  
  return (
    <S.Wrap >
      <S.Container>
        <BrandsFilter/>
        
        <CategoriesFilter/>
        
        <RangeFilter title={'Цена'} range_key={['price_from', 'price_to']} value={[price_from, price_to]}/>
  
        <RangeFilter title={'Скидка'} range_key={['sale_from', 'sale_to']} value={[sale_from, sale_to]}/>
        
        <SizesFilter/>
      </S.Container>
    </S.Wrap>
  )
}



const S = {
  Wrap: styled.div`
    height: 100%;
    padding-right: 30px;
`,
  
  Container: styled.div`
    width: 100%;
    box-shadow: 0 0 10px rgba(189, 189, 189, 0.25);

`,
  

}
