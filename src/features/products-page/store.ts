import { createEffect, createEvent, createStore, guard, merge, sample } from 'lib/effector'
import { RouteComponentProps } from 'react-router'
import { TypesSortProducts, FilterReqParams, ProductsReqParams, ProductsRequest, PaginateInfo, FiltersRequest } from '../../api/types'
import { api } from '../../api'
import { $baseLink } from '../../stores/env'
import { recordWithoutNull , sexIdToStr, sexStrToId } from '../../helpers/lib'
import config from '../../config'
import { parseQueryProducts, parseSearch } from '../../ssr/lib'
import { StatusPage, MainState  } from './types'
import { setItemToArray } from './lib'
import {  ListFilters, ListTranslateFilters } from './organisms/filters/types'


//region route_history:
export const $initRouteHistory = createEvent<RouteComponentProps['history']>()
const routeHistory = createStore<RouteComponentProps['history'] | null>(null)
routeHistory.on($initRouteHistory, (_, payload) => payload)
//endregion route_history



// region main_state:
export const $mainState = createStore<MainState>({
  sexId: null,
  categories: null,
  brands: null,
  sizes: null,
  colors: null,
  price_from: null,
  price_to: null,
  sale_from: null,
  sale_to: null,
  favorite: null,
  page: 1,
  sort: 'update_up',
  limit: null,
})



export const $toggleSex = createEvent<1 | 2>()
$mainState.on($toggleSex, (_, sexId) => ({ ...$mainState.defaultState, sexId }))


export const filtersState = $mainState.map(({ sexId, categories, brands, sizes, colors, price_to, price_from, sale_to, sale_from, favorite }) => ({
  sexId, categories, brands, sizes, colors, price_to, price_from, sale_to, sale_from, favorite
}))


export const productsState = $mainState.map(({ limit, page, sort }) => ({ limit, sort, page }))
// endregion main_state:




// region setsSomeFilter:
export const $setSomeFilter = createEvent<{key: keyof Omit<MainState, 'sort' | 'limit' | 'page'>, value: string | number | boolean | null}>('filters')
export const $setListFilter = createEvent<{key: ListTranslateFilters | ListFilters, value: string | number}>()
export const $skipCurrentFilter = createEvent<{key: ListTranslateFilters | ListFilters}>()

$mainState.on(merge([$setListFilter, $setSomeFilter]), (state, { key, value }) => {
  if (value == null) return ({ ...state, [key] : null })
  switch (key) {
    case 'categories':
    case 'brands':
    case 'sizes':
    case 'colors': return { ...state, [key]: setItemToArray(state[key], value) }
    case 'price_from':
    case 'price_to':
    case 'sale_from':
    case 'sale_to': return { ...state, [key]: Number(value) }
    case 'favorite': return { ...state, [key]: Boolean(value) }
    default: return undefined
  }
})

$mainState.on($skipCurrentFilter, (state, { key }) => {
  switch (key) {
    case 'brands':
    case 'categories':
    case 'colors':
    case 'sizes': return { ...state, [key]: null }
    
    default: return undefined
  }
})

// endregion setsSomeFilter



// region setsSomeProductsParams:
export const $setPage = createEvent<number>()
$mainState.on($setPage, (state, page) => ({ ...state, page }))

export const $setSort = createEvent<TypesSortProducts>()
$mainState.on($setSort, (state, sort) => ({ ...state, sort }))
// endregion setsSomeProductsParams



// region fetchFilters:
const fetchFilters = createEffect({
  handler: ( params: FilterReqParams ) => api.products.getFilters(params)
})

const $fetchFiltersParams = filtersState.map(state => {
  if (state.sexId === null) return undefined
  const params: any = { sex_id: state.sexId }
  return recordWithoutNull(state, params) as FilterReqParams
})

guard({
  source: $fetchFiltersParams.updates,
  filter: () => true,
  target: fetchFilters
})
// endregion fetchFilters



// region fetchProducts:
const fetchProducts = createEffect({
  handler: (params: ProductsReqParams) => api.products.getProducts(params)
})

const $fetchProductsParams = $mainState.map(state => {
  if (state.sexId === null) return undefined
  const params: any = { sex_id: state.sexId }
  return recordWithoutNull(state, params) as ProductsReqParams
})

guard({
  source: $fetchProductsParams.updates,
  filter: () => true,
  target: fetchProducts
})
// endregion fetchProducts



// region encodeUrlState:
sample(routeHistory, $mainState.updates, (history, payload) => {
  if (config.ssr || payload.sexId === null) return undefined
  
  const newUrl = '/products/' + sexIdToStr(payload.sexId)
  let search = ''
  
  const encodeState = recordWithoutNull(payload) as NonNullable<MainState>
  if (Object.entries(encodeState).length > 0) {
    search = '?' +
      Object.entries(encodeState)
        .filter(([key, value]) => {
          switch (key as keyof MainState) {
            case 'sexId': return false
            case 'sort': return value !== 'update_up'
            case 'page': return value !== 1
            case 'favorite': return Boolean(value)
            default: return true
          }
        })
        .map(([key, value]) => {
          if (Array.isArray(value)) return key + '=' + value.join('|')
          switch (typeof value) {
            case 'number': return key + '=' + value.toString()
            case 'string': return key + '=' + value
            case 'boolean': return key + '=' + (value ? '1' : '0')
            default: return key + '='
          }
        })
        .join('&')
  }
  const url = newUrl + search
  history?.replace(url)
})
// endregion encodeUrlState



//region filtersStore:
export const $filtersStore = createStore<FiltersRequest | null>(null)
$filtersStore.on(fetchFilters.done, (state, { result: { data } }) => data)
//endregion filtersStore



//region productsStore:
export const $productsStore = createStore<ProductsRequest['products']>([])
$productsStore.on(fetchProducts.done, (state, { result: { data: { products } } }) => products)

export const $productsInfoStore = createStore<PaginateInfo>({
  total: 0,
  total_pages: 0
})
$productsInfoStore.on(fetchProducts.done, ((state, { result: { data: { info } } }) => info))
//endregion productsStore



// region mountApp:
export const $mountProductsPage = createEvent()

const storeForMount = $baseLink.map(state => {
  const { linkParams: { search, sexLine } } = state
  if (sexLine === null) return null
  const sexId = sexStrToId(sexLine)
  const queryParams = parseSearch(search)
  return { ...parseQueryProducts(queryParams), sexId }
})


const targetUpdate = sample(storeForMount, $mountProductsPage)
$mainState.on(targetUpdate, (state, payload) => {
  if (payload === null) return undefined
  return { ...state, ...payload }
})


$mainState.on($initRouteHistory, (state, history) => {
  const { location: { pathname, search } } = history
  if (!pathname.includes('men')) return undefined
  const sexId = pathname.includes('women') ? 2 : 1
  const queryParams = parseSearch(search.replace('?', ''))
  return { ...state, ...parseQueryProducts(queryParams), sexId }
})
// endregion mountApp



// region statusPage:
export const $loadingProducts = fetchProducts.pending.map(state => state)
$loadingProducts.on(fetchProducts, () => true)
$loadingProducts.on(merge([fetchProducts.done, fetchProducts.fail]), () => false)

export const $statusPageProducts = createStore<StatusPage>('START')
$statusPageProducts.on(fetchProducts.done, (state, { result: { data: { products } } }) => {
  if (products.length === 0) return 'EMPTY'
  return 'READY'
})
// endregion statusPage
