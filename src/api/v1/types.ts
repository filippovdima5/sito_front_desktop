//region User:
export interface UserRequest {
  sex_id?: 1 | 2,
  likes?: Array<string>,
}

export interface UserReqParams {
  sex_id?: 1 | 2,
  likes?: Array<string>,
}
// endregion User




// region products:
export interface ShortProduct {
  id: string,
  title: string,
  url: string,
  img: Array<string>,
  brand: string,
  price: number,
  oldprice: number,
  sale: number,
  sizes: Array<string>,
}

export interface PaginateInfo {
  total: number,
  total_pages: number,
}

export type TypesSortProducts = 'update_up' | 'price_up' | 'sale_up'

export interface ProductsReqParams {
  sex_id: 1 | 2,
  brands?: Array<string>,
  categories?: Array<number>,
  sizes?: Array<string>,
  colors?: Array<string>,
  price_from?: number,
  price_to?: number,
  sale_from?: number,
  sale_to?: number,

  page?: number,
  sort?: TypesSortProducts,
  limit?: number,

  favorite?: boolean,
}

export interface ProductsRequest {
  products: Array<ShortProduct>,
  info: PaginateInfo,
}

export interface FiltersItemString {
  value: string,
  count: number,
  available: boolean,
}

export interface FiltersItemNumber {
  value: number,
  count: number,
  available: boolean,
}

export interface FiltersRequest {
  categories: Array<FiltersItemNumber>,
  brands: Array<FiltersItemString>,
  sizes: Array<FiltersItemString>,
  colors: Array<FiltersItemString>,
  price_from: number,
  price_to: number,
  sale_from: number,
  sale_to: number,

  favorite?: boolean,
}

export interface FilterReqParams {
  sex_id: 1 | 2,
  brands?: Array<string>,
  categories?: Array<number>,
  sizes?: Array<string>,
  colors?: Array<string>,
  price_from?: number,
  price_to?: number,
  sale_from?: number,
  sale_to?: number,

  favorite?: boolean,
}
// endregion



//region mainSearch
export interface MainSearchReqParams {
  sex_id: 1 | 2 | 0,
  phrase: string,
}

export const typeMainSearchResultItem = {
  brand: ' Бренд',
} as const


export interface MainSearchResultItem {
  title: string,
  count: number,
  type: keyof typeof typeMainSearchResultItem,
}


//endregion mainSearch



//region Simple:
export interface BrandItem {
  _id: string,
  count: number,
}

export interface AllBrandsRequest {
  char: string,
  brands: Array<BrandItem>,
}
// endregion region Simple


// region Seo:
export interface SeoReqParams {
  sexId: 1 | 2 | null,
  path: string,
  search: string,
}

export interface SeoRequest {
  title: string,
  description: string,
}
// endregion Seo

