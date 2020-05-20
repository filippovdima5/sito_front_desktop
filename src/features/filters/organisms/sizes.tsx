import React from 'react'
import { useStore, useEvent } from 'effector-react/ssr'
import { FilterCurtain } from '../templates'
import { Option, Input } from '../../../commons/atoms'
import {
  $addOneFilterValue,
  $sizeFilters,
  $deleteOneFilterValue,
  $setSearchSize,
  $size_search,
  $allFields,
  $setNotSize
} from '../../products-page/new-store'


function SearchSize() {
  const searchPhrase = useStore($size_search)
  const setSearchSize = useEvent($setSearchSize)
  
  return (
    <Input
      placeholder={'Поиск'}
      search={true}
      value={searchPhrase}
      onChange={value => setSearchSize(value)}
    />
  )
  
}


export function SizesFilter() {
  const data = useStore($sizeFilters)
  const { not_size, sizes } = useStore($allFields)
  const addOneFilterValue = useEvent($addOneFilterValue)
  const deleteOneFilterValue = useEvent($deleteOneFilterValue)
  const setNotSize = useEvent($setNotSize)
  
  
  return (
    <FilterCurtain search={<SearchSize/>} title={'Размеры'}>
      <Option
        index={'not_size'}
        label={'Размер не известен'}
        checked={not_size}
        onClick={() => setNotSize()}
      />
      { data.map(item => (
        <Option
          key={item}
          index={item}
          label={item}
          onAdd={(key) => {addOneFilterValue({ key: 'sizes', value: key })}}
          onDel={(key) => deleteOneFilterValue({ key: 'sizes', value: key })}
          checked={sizes.includes(item)}
        />
      )) }
    </FilterCurtain>
  )
}
