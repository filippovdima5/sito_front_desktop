import { findSexIdInPath, sexIdToStr } from '../../lib'
import { encodeNumberArray, encodeStringArray } from '../../api/v2/lib'
import { defaultFields, sortTypes } from './constants'
import { QueryFields } from './types'


// region parse uri:
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



// region encode uri:
const encodeNumber = (key: string, value?: number): string | '' => {
  if (!value) return ''
  if (defaultFields[key as keyof QueryFields] === value) return ''
  return `${key}=${value.toString()}&`
}

const encodeString = (key: string, value?: string): string | '' => {
  if (!value) return ''
  if (defaultFields[key as keyof QueryFields] === value) return ''
  return `${key}=${value}&`
}



export const encodeProductsUrl = (params: QueryFields): string | null => {
  if (!params['sex_id']) return null
  const pathname = `/${sexIdToStr(params['sex_id'])}/products`
  
  let search = ''
  Object.entries(params).forEach(([key, value]) => {
    switch (key) {
      case 'price_from':
      case 'price_to':
      case 'sale_from':
      case 'sale_to':
      case 'page':
      case 'limit': return (search = search + encodeNumber(key, value as number))
      case 'brands':
      case 'sizes': return (search = search + encodeStringArray(key, value as Array<string>))
      case 'categories': return (search = search + encodeNumberArray(key, value as Array<number>))
      default: return (search = search + encodeString(key, value as string))
    }
  })
  
  if (!search) return pathname
  search = search.slice(0, -1)
  return `${pathname}?${search}`
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





