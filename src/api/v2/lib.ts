import { GetProductsParams } from './types'


const parseNumber = (key: string, value?: number): string | null => {
  if (!value) return null
  return `${key}=${value.toString()}&`
}

const parseString = (key: string, value?: string): string | null => {
  if (!value) return null
  return `${key}=${value}&`
}

const parseNumberArray = (key: string, value?: Array<number>): string | null => {
  if (!value || value.length === 0) return null
  return `${key}=${value.join()}&`
}

const parseStringArray = (key: string, value?: Array<string>): string | null => {
  if (!value || value.length === 0) return null
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
      case 'limit': return (search = search + parseNumber(key, value as number))
      case 'brands':
      case 'sizes': return (search = search + parseStringArray(key, value as Array<string>))
      case 'categories': return (search = search + parseNumberArray(key, value as Array<number>))
      default: return (search = search + parseString(key, value as string))
    }
  })
  
  return search.slice(0, -1)
}
// endregion
