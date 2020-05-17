import { SexId } from '../../types'
import {  unisexCategoryKeys } from '../../constants'
import { findSexIdInPath } from '../../lib'
import { sortTypes } from './constants'


// region
type QueryFields = {
  sex_id?: SexId,
  price_from?: number,
  price_to?: number,
  sale_from?: number,
  sale_to?: number,
  page?: number,
  limit?: number,
  brands?: Array<string>,
  sizes?: Array<string>,
  categories?: Array<keyof typeof unisexCategoryKeys>,
  sort?: keyof typeof sortTypes,
}


export const defaultFields = {
  sex_id: (1 as SexId),
  limit: 36,
  sort: ('create_up' as keyof typeof sortTypes),
  page: 1,
  categories: ([] as Array<keyof typeof unisexCategoryKeys> | Array<number>),
  brands: ([] as Array<string>),
  sizes: ([] as Array<string>),
  price_from: 1,
  price_to: 30000,
  sale_from: 30,
  sale_to: 99
} as const
// endregion


// region
function parseNumber(key: string, value: string, query: any): void {
  if (!isNaN(Number(value))) query[key as keyof QueryFields] = Number(value)
}

function parseArrayNumber(key: string, value: string, query: any): void {
  if (value) {
    const res = value.split(',').filter(i => !isNaN(Number(i))).map(i => Number(i))
    if (res.length > 0) query[key as keyof QueryFields] = res
  }
}

function parseArrayString(key: string, value: string, query: any): void {
  if (value) {
    const res = value.split(' | ')
    if (res.length > 0) query[key as keyof QueryFields] = res
  }
}
// endregion


// region parse:
export const parseUrl = (pathname: string, search: string ): QueryFields => {
  const query: QueryFields = { sex_id: findSexIdInPath(pathname) }
  
  if (!search) return query
  let foundFields: any = {}
  
  try {
    foundFields = Object.fromEntries(
      decodeURI(search).replace('?', '')
        .split('&')
        .map(i => i.split('='))
    )
  } catch (e) {
    console.error(e)
    return query
  }
  
  Object.entries(foundFields).forEach(([key, value]) => {
    switch (key) {
      case 'sex_id':
      case 'price_from':
      case 'price_to':
      case 'sale_from':
      case 'sale_to':
      case 'page':
      case 'limit': return parseNumber(key, value as string, query)
      case 'brands':
      case 'sizes': return parseArrayString(key, value as string, query)
      case 'categories': return parseArrayNumber(key, value as string, query)
      case 'sort': {
        if (value && sortTypes[value as keyof typeof sortTypes]) {
          query['sort'] = value as keyof typeof sortTypes
        }
      }
    }
  })
  
  return query
}
// endregion




















export function setItemToArray<T>(array: null | Array<T>, value: T): Array<T> | null {
  if (array === null) return [value]
  
  if (array.includes(value)) {
    const arr = array.filter(item => item !== value)
    if (arr.length === 0) return null
    return arr
  }
  
  return array.concat([value])
}





