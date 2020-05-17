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
export type GetProductsParams = {
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
