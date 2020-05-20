import React from 'react'
import { useStore, useEvent } from 'effector-react/ssr'
import styled from 'styled-components'
import { FilterCurtain } from '../templates'
import { Option, Input, Button1 } from '../../../commons/atoms'
import {
  $allFields,
  $addOneFilterValue,
  $deleteOneFilterValue,
  $brandFilters,
  $setSearchBrands,
  $setShowAllBrands,
  $extraFields } from '../../products-page/new-store'



function SearchBrand() {
  const { brand_search } = useStore($extraFields)
  const setSearchBrands = useEvent($setSearchBrands)

  
  return (
    <Input
      placeholder='Поиск'
      search={true}
      value={brand_search}
      onChange={value => setSearchBrands(value)}
    />
  )
}

export function BrandsFilter() {
  const data = useStore($brandFilters)
  const { brand_all } = useStore($extraFields)
  const { brands } = useStore($allFields)
  const addOneFilterValue = useEvent($addOneFilterValue)
  const deleteOneFilterValue = useEvent($deleteOneFilterValue)
  const setShowAllBrands = useEvent($setShowAllBrands)
  
  return (
    <FilterCurtain search={<SearchBrand/>} title={'Бренды'}>
      { data.map(item => (
        <Option
          key={item}
          index={item}
          label={item}
          onAdd={(key) => {addOneFilterValue({ key: 'brands', value: key })}}
          onDel={(key) => deleteOneFilterValue({ key: 'brands', value: key })}
          checked={brands.includes(item)}/>
      )) }
      
      {!brand_all && (
        <S.ButtonContainer>
          <Button1
            onClick={() => setShowAllBrands()}
            className='button'>
            Показать все
          </Button1>
        </S.ButtonContainer>
      )}
    </FilterCurtain>
  )
}


const S = {
  ButtonContainer: styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
    
    & .button {
      width: 80%;
    }
`
}
