import { GetProductsParams } from './types'


const encodeNumber = (key: string, value?: number): string | '' => {
  if (!value) return ''
  return `${key}=${value.toString()}&`
}

const encodeString = (key: string, value?: string): string | '' => {
  if (!value) return ''
  return `${key}=${value}&`
}

export const encodeNumberArray = (key: string, value?: Array<number>): string | '' => {
  if (!value || value.length === 0) return ''
  return `${key}=${value.join()}&`
}

export const encodeStringArray = (key: string, value?: Array<string>): string | '' => {
  if (!value || value.length === 0) return ''
  return `${key}=${value.join(' | ')}&`
}


// region
export const formQueryGetProductsList = (params: GetProductsParams): string => {
  let search = '?'
  Object.entries(params).forEach(([key, value]) => {
    switch (key) {
      case 'sex_id':
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
  
  return search.slice(0, -1)
}
// endregion
