import { TypesSortProducts } from '../../api/types'


export type StatusPage = 'START' | 'EMPTY' | 'READY' | 'FAIL'

export type TypeOfSetParams = 'all' | 'filters' | 'products'


export type MainState = {
  sexId: 1 | 2 | null,
  categories: Array<number> | null,
  brands: Array<string> | null,
  sizes: Array<string> | null,
  colors: Array<string> | null,
  price_from: number | null,
  price_to: number | null,
  sale_from: number | null,
  sale_to: number | null,
  favorite: boolean | null,
  page: number | null,
  sort: TypesSortProducts | null,
  limit: number | null,
}
