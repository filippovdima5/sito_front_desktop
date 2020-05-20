import React from 'react'
import { useStore, useEvent } from 'effector-react/ssr'
import { FilterCurtain } from '../templates'
import { Option } from '../../../commons/atoms'
import {
  $allFields,
  $addOneFilterValue,
  $deleteOneFilterValue,
  $brandFilters
} from '../../products-page/new-store'



function SearchBrand() {
  return (
    <div>search brands</div>
  )
}

export function BrandsFilter() {
  const data = useStore($brandFilters)
  const { brands } = useStore($allFields)
  const addOneFilterValue = useEvent($addOneFilterValue)
  const deleteOneFilterValue = useEvent($deleteOneFilterValue)
  
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
    </FilterCurtain>
  )
}
