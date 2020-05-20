import React from 'react'
import styled from 'styled-components'
import { FilterCurtain } from './templates'
import { BrandsFilter, CategoriesFilter } from './organisms'


export function Filters () {

  return (
    <S.Wrap >
      <S.Container>
        <BrandsFilter/>
        
        <CategoriesFilter/>
        
        <FilterCurtain title={'Цена'}/>
        
        <FilterCurtain title={'Размеры'}/>
        
        <FilterCurtain title={'Скидка'}/>
        
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
