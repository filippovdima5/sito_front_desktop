import { TypesSortProducts } from '../../api/v1/types'
import {SexId} from '../../types'
import {unisexCategoryKeys} from '../../constants'
import {sortTypes} from './constants'


export type StatusPage = 'START' | 'EMPTY' | 'READY' | 'FAIL'



export type QueryFields = {
  sex_id?: SexId,
  price_from?: number,
  price_to?: number,
  sale_from?: number,
  sale_to?: number,
  page?: number,
  limit?: number,
  brands?: Array<string>,
  sizes?: Array<string>,
  categories?: Array<keyof typeof unisexCategoryKeys> | Array<number>,
  sort?: keyof typeof sortTypes,
}



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
