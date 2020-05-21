import {  unisexCategoryKeys } from '../../constants'
import { sortTypes } from '../../features/products-page/constants'


// region
export type PaginateResponse<Item> = {
  items: Array<Item>,
  pagination: {
    totalItems: number,
    totalPages: number,
  },
}
// endregion



// region popularBrands
import { SexId } from '../../types'
import {BrandItem} from '../v1/types'


export type PopularBrandsParams = {
  sexId: SexId,
  limit: number,
}
// endregion



// region Product:
export interface ShortProduct {
  'id': string,
  'title': string,
  'brand': string,
  'sexId': SexId,
  'categoryId': keyof typeof unisexCategoryKeys,
  'sizes': Array<string>,
  'colors': Array<string>,
  'images': Array<string>,
  'price': number,
  'oldPrice': number,
  'sale': number,
}
// endregion


// region getProductsList:
export interface GetProductsParams{
  sex_id: SexId,
  limit: number,
  sort: keyof typeof sortTypes,
  page: number,
  categories?: Array<keyof typeof unisexCategoryKeys> | Array<number>,
  brands?: Array<string>,
  sizes?: Array<string>,
  price_from?: number,
  price_to?: number,
  sale_from?: number,
  sale_to?: number,
}
// endregion


// region Filters:
export interface  GetFiltersParams {
  sex_id: SexId,
  categories?: Array<keyof typeof unisexCategoryKeys> | Array<number>,
  brands?: Array<string>,
  sizes?: Array<string>,
  price_from?: number,
  price_to?: number,
  sale_from?: number,
  sale_to?: number,
  brand_search?: string,
  brand_all?: boolean,
}

export type FacetFilters = {
  categories: Array<keyof typeof unisexCategoryKeys> | Array<number>,
  brands: Array<string>,
  sizes: Array<string>,
}
// endregion


// region brand by char
export type GetBrandsByCharParams = {
  sex_id: SexId,
  phrase?: string,
}

export type BrandByChar = {
  char: string,
  brands: Array<string>,
}
// endregion
