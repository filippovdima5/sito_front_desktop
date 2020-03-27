import { MainState } from '../../types'
import { filtersName } from './constants'


export type MainRangeFilters = Pick<MainState, 'sale_from' | 'sale_to' | 'price_from' | 'price_to'>

export type RangeFilters = keyof Pick<typeof filtersName, 'prices' | 'sales'>
export type ListFilters = keyof Pick<typeof filtersName, 'brands' | 'colors' | 'sizes'>
export type ListTranslateFilters = keyof Pick<typeof filtersName, 'categories'>
export type BoolFilters =  keyof Pick<typeof filtersName, 'favorite'>


export type ItemFiltersList = { name: RangeFilters, type: 'range' }
| { name: ListFilters, type: 'list' }
| { name: ListTranslateFilters, type: 'list-translate' }
| { name: BoolFilters, type: 'bool' }

export type FiltersList = Array<ItemFiltersList>
