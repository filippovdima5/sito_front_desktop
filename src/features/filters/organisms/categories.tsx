import React from 'react'
import { useStore, useEvent } from 'effector-react/ssr'
import { FilterCurtain } from '../templates'
import { Option } from '../../../commons/atoms'
import { $categoryFilters , $allFields, $addOneFilterValue, $deleteOneFilterValue } from '../../products-page/new-store'
import { categoryKeys } from '../../../constants'




export function CategoriesFilter() {
  const data = useStore($categoryFilters)
  const { categories } = useStore($allFields)
  const addOneFilterValue = useEvent($addOneFilterValue)
  const deleteOneFilterValue = useEvent($deleteOneFilterValue)
  
  return (
    <FilterCurtain title={'Категории'}>
      {data.map(({ key, label, available }) => (
        <Option
          checked={categories.includes(key as keyof typeof categoryKeys[1 | 2])}
          index={key}
          key={key}
          label={label}
          onAdd={(key) => {addOneFilterValue({ key: 'categories', value: key })}}
          onDel={(key) => deleteOneFilterValue({ key: 'categories', value: key })}
          disable={!available}
        />
      ))}
    </FilterCurtain>
  )
}
