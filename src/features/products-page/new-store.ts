import { createStore, createEvent, sample, createEffect, guard, forward, merge } from 'lib/effector'
import { createThrottle } from 'effector-throttle'
import { createDebounce } from 'effector-debounce'
import { GetFiltersParams, GetProductsParams, ShortProduct } from '../../api/v2/types'
import config from '../../config'
import { apiV2 } from '../../api'
import { SexId } from '../../types'
import { categoryKeys } from '../../constants'
import { encodeProductsUrl, parseUrl, sortBrands, sortSizes } from './lib'
import { QueryFields, StatusPage } from './types'
import { defaultFields, sortTypes, valuesOfFilterButtons } from './constants'



// region Fields:
export const $allFields = createStore<Required<QueryFields>>(defaultFields)
const $setFields = createEvent<QueryFields | null>()
const $setFieldsWithReset = createEvent<QueryFields | null>()

$allFields.on($setFieldsWithReset, ((state, payload) => {
  if (payload === null) return $allFields.defaultState
  return ({ ...$allFields.defaultState, ...payload })
}))

$allFields.on($setFields, (state, payload) => {
  if (payload !== null) return ({ ...state, ...payload })
})
// endregion



// region stores with data:
export const $statusPageProducts = createStore<StatusPage>('START')
export const $products = createStore<Array<ShortProduct>>([])
export const $totalPages = createStore<number>(0)
export const $loading = createStore<boolean>(false)

export const $brandFilters = createStore<Array<string>>([])
export const $categoryFilters = createStore<Array<{ key: number, available: boolean, label: string }>>([])
export const $sizeFilters = createStore<Array<string>>([])
export const $loadingFilters = createStore<boolean>(false)
export const $loadingBrandFilters = createStore<boolean>(false)
// endregion



// region fetchProducts:
/**При передачи любого поля будет загрузка:*/
const $setFetchProducts = createEvent<QueryFields | null>()
const $throttleFetchProducts = createEvent<QueryFields | null>()

const $paramsForFetchProducts = createStore<GetProductsParams | null>(null)

$paramsForFetchProducts.on(
  sample($allFields, merge([
    $setFetchProducts,
    createThrottle($throttleFetchProducts, 1000)
  ]), (fields, newState) => ({ fields, newState })),
  // @ts-ignore
  (_, payload) => { if (payload) return ({ ...payload.fields, ...payload.newState }) }
)


const fetchProductsList = createEffect({ handler: (params: GetProductsParams) => apiV2.getProductsList(params) })


guard({
  source: $paramsForFetchProducts.updates,
  filter: $paramsForFetchProducts.map(params => !!params),
  target: fetchProductsList
})


$products.on(fetchProductsList.done, (_, { result: { data: { items } } }) => items)
$totalPages.on(fetchProductsList.done, (_, { result: { data: { pagination: { totalPages } } } }) => totalPages)
$loading.on(fetchProductsList.pending, (_, p) => p)
$statusPageProducts.on(fetchProductsList.done, (_, { result: { data: { items } } }) => {
  if (items.length === 0) return 'EMPTY'
  return 'READY'
})
// endregion




// region fetch filters:
/** FILTERS*/
const $debounceFetchFilters = createEvent<QueryFields | null>()

const $extraFields = createStore({
  brand_search: '',
  brand_all: false,
})

const $paramsForFetchFilters = createStore<null | GetFiltersParams>(null)
const $eventFetchFilters = sample(
  $allFields,
  createDebounce($debounceFetchFilters, 500),
  (fields, newState) => ({ fields, newState })
)
$paramsForFetchFilters.on(
  sample($extraFields, $eventFetchFilters, ((extraFields, clock) => ({ ...clock, extraFields }))),
  (_, payload) => { if (payload) { // @ts-ignore
    return ({ ...payload.fields, ...payload.newState, ...payload.extraFields })
  } }
)

const fetchFacetFilters = createEffect({ handler: (params: GetFiltersParams) => apiV2.filters.facet(params) })
guard({
  source: $paramsForFetchFilters.updates,
  filter: $paramsForFetchFilters.map(state => (state !== null && !config.ssr)),
  target: fetchFacetFilters
})


$categoryFilters.on(
  sample($allFields, fetchFacetFilters.done, ({ sex_id }, { result: { data: { categories } } }) => ({ sex_id, categories })),
  // @ts-ignore
  (state, payload) => Object.entries(categoryKeys[payload.sex_id as 1 | 2])
    // @ts-ignore
    .map(([key, value]) => ({ key: Number(key), available: payload.categories.includes(Number(key)), label: value as string }))
    .filter(({ key }) => ![1000, 2000, 3000].includes(key))
)

$brandFilters.on(fetchFacetFilters.done, (state, { result: { data: { brands } } }) => sortBrands(brands))
$sizeFilters.on(fetchFacetFilters.done, (state, { result: { data: { sizes } } }) => sortSizes(sizes))
$loadingFilters.on(fetchFacetFilters.pending, (_, p) => p)
// endregion

$categoryFilters.watch(state => console.log(state))
$brandFilters.watch(state => console.log(state))
$sizeFilters.watch(state => console.log(state))
/** END_FILTERS*/



// region pushToUrlString:
export const $setReplace = createEvent<any>()
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const $replace = createStore<any>(() => {})
$replace.on($setReplace, (_, p) => p)


const $setPushUrl = createEvent<QueryFields>()
const $debouncePushUrl = createDebounce($setPushUrl, 2000)

sample($replace, $debouncePushUrl, (replace, query) => ({ query, replace }))
  .watch(({ query, replace }) => {
    if (config.ssr) return
    const url = encodeProductsUrl(query)
    replace(url)
  })
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


const $paramsForMount = createStore<QueryFields | null>(null)
$paramsForMount.on($eventForMount, (state, urlParams) => {
  if (!urlParams) return
  return parseUrl(urlParams.pathname, urlParams.search)
})

forward({ from: $paramsForMount.updates, to: [$setFetchProducts, $setFieldsWithReset, $debounceFetchFilters] })


// Фильтры на сервере не отрендерятся, поэтому нужно вызвать этот евент на клиенте в любом случае:
const $paramsForMountFilters = createStore<QueryFields | null>(null)
$paramsForMountFilters.on(sample($mountInServer, $mountProductsPage, (inServer, urlParams) => ({ inServer, urlParams })), (state, payload) => {
  // @ts-ignore
  if (payload.inServer && !config.ssr) return parseUrl(payload.urlParams.pathname, payload.urlParams.search)
  return null
})
forward({ from: $paramsForMountFilters.updates, to: $debounceFetchFilters })
// endregion



// region filter buttons view:
type ViewFilterButton = { key: keyof Pick<QueryFields, 'sex_id'>, value: SexId, label: string } |
{ key: keyof Pick<QueryFields, 'sort'>, value: keyof typeof sortTypes, label: string} |
{ key: keyof Pick<QueryFields, 'brands' | 'sizes'>, value: string, label: string} |
{ key: keyof Omit<QueryFields, 'sex_id' | 'sort' | 'brands' | 'sizes'>, value: number, label: string}


const pushButton = (key: string, value: any, buttons: Array<ViewFilterButton>) => {
  if (value === defaultFields[key as keyof QueryFields]) return
  // @ts-ignore
  buttons.push({ key, value: value, label: valuesOfFilterButtons[key](value) })
}

export const $viewFilterButtons = createStore<Array<ViewFilterButton>>([])

const $filtersFields = $allFields
  .map(({ price_to, sex_id, brands, categories, price_from, sale_from, sale_to, sizes }) =>
    ({ price_to, sex_id, brands, categories, price_from, sale_from, sale_to, sizes }))

$viewFilterButtons.on($filtersFields, (state, payload) => {
  const buttons: Array<ViewFilterButton> = []
  
  Object.entries(payload).forEach(([ key, value ]) => {
    switch (key as keyof QueryFields) {
      case 'price_from':
      case 'price_to':
      case 'sale_from':
      case 'sale_to': return pushButton(key, value, buttons)
      case 'brands':
      case 'sizes': {
        // @ts-ignore
        payload[key].forEach(item => buttons.push({ key, value: item, label: valuesOfFilterButtons[key](item) }))
        return
      }
      case 'categories': {
        // @ts-ignore
        payload[key].forEach(item => buttons.push({ key, value: item, label: valuesOfFilterButtons[key](item, payload.sex_id) }))
        return
      }
    }
  })
  
  const lastButtons = state
    .filter(item => !!buttons.find(({ label }) => label === item.label))
    .map(item => JSON.stringify(item))
  
  const newButtons = Array.from(new Set([
    ...lastButtons,
    ...buttons.map(item => JSON.stringify(item))
  ]))
  
  return newButtons.map(item => JSON.parse(item))
})
// endregion



// region addFilterValue
// endregion



// region deleteFilterValue:
export const $deleteOneFilterValue = createEvent<{ key: keyof QueryFields, value: string | number | boolean}>()
forward({
  from: sample($allFields, $deleteOneFilterValue, (query, { key, value }) => {
    switch (key) {
      case 'price_from':
      case 'price_to':
      case 'sale_from':
      case 'sale_to': return ({ ...query, [key]: defaultFields[key] })
      case 'brands':
      case 'sizes': return ({ ...query, [key]: query[key].filter(item => item !== value.toString()) })
      case 'categories': return ({ ...query, [key]: query[key].filter(item => item !== Number(value)) })
      default: return null
    }
  }),
  to: [ $setFields, $throttleFetchProducts, $setPushUrl, $debounceFetchFilters ]
})
// endregion



// region set sort:
export const $setSort = createEvent<keyof typeof sortTypes>()

forward({
  from: sample($allFields, $setSort, (query, typeSort) => ({ ...query, sort: typeSort })),
  to: [ $setFetchProducts, $setFields, $setPushUrl ]
})
// endregion


// region set page
export const $setPage = createEvent<number>()

forward({
  from: sample($allFields, $setPage, (query, page) => ({ ...query, page })),
  to: [ $setFetchProducts, $setFields, $setPushUrl ]
})
// endregion












