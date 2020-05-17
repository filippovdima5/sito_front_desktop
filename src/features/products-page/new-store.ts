import { createStore, createEvent, sample, createEffect, guard, combine } from 'lib/effector'
import { SexId } from '../../types'
import {  unisexCategoryKeys } from '../../constants'
import { GetProductsParams, ShortProduct } from '../../api/v2/types'
import config from '../../config'
import { apiV2 } from '../../api'
import { defaultFields, parseUrl } from './lib'
import { StatusPage } from './types'
import { sortTypes, valuesOfFilterButtons } from './constants'


// region Fields:
const $sexId = createStore<SexId>(defaultFields['sex_id'])
const $limit = createStore<number>(defaultFields['limit'])
const $sort = createStore<keyof typeof sortTypes>(defaultFields['sort'])
const $page = createStore<number>(defaultFields['page'])
const $categories = createStore<Array<keyof typeof unisexCategoryKeys> | Array<number>>(defaultFields['categories'])
const $brands = createStore<Array<string>>(defaultFields['brands'])
const $sizes = createStore<Array<string>>(defaultFields['sizes'])
const $priceFrom = createStore<number>(defaultFields['price_from'])
const $priceTo = createStore<number>(defaultFields['price_to'])
const $saleFrom = createStore<number>(defaultFields['sale_from'])
const $saleTo = createStore<number>(defaultFields['sale_to'])
// endregion



// region stores with data:
export const $statusPageProducts = createStore<StatusPage>('START')
export const $products = createStore<Array<ShortProduct>>([])
export const $totalPages = createStore<number>(0)
export const $loading = createStore<boolean>(false)
// endregion


// region mountPage:
const $mountInServer = createStore<boolean>(false)
export const $mountProductsPage = createEvent<{ pathname: string, search: string }>()

const $eventForMount = sample($mountInServer, $mountProductsPage, (inServer, urlParams) => {
  if (config.ssr) return urlParams
  if (inServer) return null
  return urlParams
})
$mountInServer.on($eventForMount, () => config.ssr)


const $paramsForMount = createStore<GetProductsParams | null>(null)
$paramsForMount.on($eventForMount, (state, urlParams) => {
  if (!urlParams) return
  const params = parseUrl(urlParams.pathname, urlParams.search)
  return ({
    ...params,
    sex_id: params.sex_id ?? defaultFields['sex_id'],
    limit: params.limit ?? defaultFields['limit'],
    sort: params.sort ?? defaultFields['sort'],
    page: params.page ?? defaultFields['page']
  })
})

const fetchProductsList = createEffect({
  handler: (params: GetProductsParams) => apiV2.getProductsList(params)
})

guard({
  source: $paramsForMount.updates,
  filter: $paramsForMount.map(params => !!params),
  target: fetchProductsList
})

$products.on(fetchProductsList.done, (_, { result: { data: { items } } }) => items)
$totalPages.on(fetchProductsList.done, (_, { result: { data: { pagination: { totalPages } } } }) => totalPages)
$loading.on(fetchProductsList.pending, (_, p) => p)
$statusPageProducts.on(fetchProductsList.done, (_, { result: { data: { items } } }) => {
  if (items.length === 0) return 'EMPTY'
  return 'READY'
})

$sexId.on($paramsForMount, (_, p) => {if (p) return p.sex_id})
$limit.on($paramsForMount, (_, p) => {if (p) return p.limit})
$sort.on($paramsForMount, (_, p) => {if (p) return p.sort})
$page.on($paramsForMount, (_, p) => {if (p) return p.page})
$categories.on($paramsForMount, (_, p) => {if (p) {return p.categories}})
$brands.on($paramsForMount, (_, p) => {if (p) {return p.brands}})
$sizes.on($paramsForMount, (_, p) => {if (p) {return p.sizes}})
$priceFrom.on($paramsForMount, (_, p) => { if (p) { return p.price_from } })
$priceTo.on($paramsForMount, (_, p) => { if (p) { return p.price_to } })
$saleFrom.on($paramsForMount, (_, p) => { if (p) { return p.sale_from } })
$saleTo.on($paramsForMount, (_, p) => { if (p) { return p.sale_to } })
// endregion



// region sort view:
const $allFilterViewButtonsState = combine({ $sexId, $categories, $brands, $sizes, $priceFrom, $priceTo, $saleFrom, $saleTo })


// todo: Нужно на выходе массив { key: string, value: 4000, view: `цена от: 4000` }
// todo убрать бойлерплейт
export const $filterButtons = createStore<Array<{ key: string | number, value: string }>>([])
$filterButtons.on($allFilterViewButtonsState, (state, payload) => {
  const arr: Array<{ key: string | number, value: string }> = []
  
  payload.$categories.forEach(item => {
    arr.push({ key: item, value: valuesOfFilterButtons['categories'](item, payload.$sexId) })
  })
  payload.$brands.forEach(item => {
    arr.push({ key: item, value: valuesOfFilterButtons['brands'](item) })
  })
  payload.$sizes.forEach(item => {
    arr.push({ key: item, value: valuesOfFilterButtons['sizes'](item) })
  })
  if (payload.$priceFrom !== defaultFields['price_from'])
    arr.push({ key: payload.$priceFrom, value: valuesOfFilterButtons['price_from'](payload.$priceFrom) })
  
  if (payload.$priceTo !== defaultFields['price_to'])
    arr.push({ key: payload.$priceTo, value: valuesOfFilterButtons['price_to'](payload.$priceTo) })
  
  if (payload.$saleFrom !== defaultFields['sale_from'])
    arr.push({ key: payload.$saleFrom, value: valuesOfFilterButtons['sale_from'](payload.$saleFrom) })
  
  if (payload.$saleTo !== defaultFields['sale_to'])
    arr.push({ key: payload.$saleTo, value: valuesOfFilterButtons['sale_to'](payload.$saleTo) })
  
  return arr
})

$filterButtons.watch(state => console.log(state))
// endregion





