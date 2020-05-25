import { createStore, createEvent, sample, createEffect, guard, forward, merge } from 'lib/effector'
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
//export const $loadingCategoryFilters = createStore<boolean>(false)
export const $loadingBrandFilters = createStore<boolean>(false)
//export const $loadingSizeFilters = createStore<boolean>(false)
// endregion



// region fetchProducts:
/**При передачи любого поля будет загрузка:*/
const $setFetchProducts = createEvent<QueryFields | null>()
const $debounceFetchProducts = createEvent<QueryFields | null>()

const fetchProductsList = createEffect({ handler: (params: GetProductsParams) => apiV2.getProductsList(params) })

guard({
  source: sample(
    $allFields, merge([$setFetchProducts, createDebounce($debounceFetchProducts, 1000)]),
    (fields, newState) => ({ ...fields, ...(newState as QueryFields || null) })
  ),
  filter: (value => value !== null),
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




/** FILTERS*/
// region fetch facet:
const $debounceFetchFilters = createEvent<QueryFields | null>()

export const $extraFields = createStore({
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

const doneFetchFacetFilters = fetchFacetFilters.done.map(({ result: { data } }) => data)
$brandFilters.on(fetchFacetFilters.done, (state, { result: { data: { brands } } }) => sortBrands(brands))
$sizeFilters.on(fetchFacetFilters.done, (state, { result: { data: { sizes } } }) => sortSizes(sizes))
$loadingBrandFilters.on(fetchFacetFilters.pending, (_, p) => { if (!p) return p })
// endregion


// region fetch brand filters
const $debounceFetchBrandFilters = createEvent<QueryFields | null>()
const $fetchBrandFilters = createEvent<QueryFields | null>()

const $paramsForFetchBrandFilters = createStore<null | GetFiltersParams>(null)

const $eventFetchBrandFilters = sample(
  $allFields,
  merge([createDebounce($debounceFetchBrandFilters, 1000), $fetchBrandFilters]),
  (fields, newState) => ({ fields, newState })
)

$paramsForFetchBrandFilters.on(
  sample($extraFields, $eventFetchBrandFilters, ((extraFields, clock) => ({ ...clock, extraFields }))),
  (_, payload) => { if (payload) { // @ts-ignore
    return ({ ...payload.fields, ...payload.newState, ...payload.extraFields })
  } }
)

const fetchBrandFilters = createEffect({ handler: (params: GetFiltersParams) => apiV2.filters.brands(params) })
guard({
  source: $paramsForFetchBrandFilters.updates,
  filter: $paramsForFetchBrandFilters.map(state => (state !== null && !config.ssr)),
  target: fetchBrandFilters
})

$brandFilters.on(fetchBrandFilters.done, (_, { result: { data } }) => sortBrands(data))
// endregion




// region
export const $setSearchBrands = createEvent<string>()
$extraFields.on($setSearchBrands, (_, brand_search) => ({ brand_search, brand_all: false }))
forward({
  from: sample(
    $paramsForFetchFilters,
    $setSearchBrands,
    (params, phrase) => {
      if (!params) return null
      return ({ ...params, brand_all: false, brand_search: phrase })
    }
  ),
  to: $debounceFetchBrandFilters
})

export const $setShowAllBrands = createEvent()
$extraFields.on($setShowAllBrands, state => ({ ...state, brand_all: true }))
forward({
  from: sample(
    $paramsForFetchFilters,
    $setShowAllBrands,
    (params) => {
      if (!params) return null
      return ({ ...params, brand_all: true })
    }
  ),
  to: $fetchBrandFilters
})

// endregion

// region search sizes
export const $size_search = createStore<string>('')
export const $setSearchSize = createEvent<string>()
const $bufferSizesFilters = createStore<Array<string>>([])
$bufferSizesFilters.on(doneFetchFacetFilters, (state, { sizes }) => sizes)

$sizeFilters.on(
  sample($bufferSizesFilters, $setSearchSize, (sizes, phrase) => ({ sizes, phrase })),
  (_, payload) => {
    if (!payload) { // @ts-ignore
      return sortSizes(payload.sizes)
    }
    // @ts-ignore
    return sortSizes(payload.sizes.filter(item => item.toLowerCase().includes((payload.phrase as string).toLowerCase())))
  })
// endregion

// region
export const $setNotSize = createEvent()
forward({
  from: sample($allFields, $setNotSize, (fields) => ({ ...fields, not_size: !fields.not_size })),
  to: [$setFields, $debounceFetchProducts, $setPushUrl, $debounceFetchFilters]
})
// endregion
/** END_FILTERS*/





// region mountPage:
const $mountInServer = createStore<boolean>(false)
const unLockFetch = createEffect({ handler: () => config.ssr })
$mountInServer.on(unLockFetch.done, (_, { result }) => result)

export const $mountProductsPage = createEvent<{ pathname: string, search: string }>()
const mountProductsPage = createEvent<{ pathname: string, search: string }>()
const firstMountFilters = createEvent<{ pathname: string, search: string }>()

guard({ source: $mountProductsPage, filter: $mountInServer.map(v => !v), target: mountProductsPage })
guard({ source: $mountProductsPage, filter: $mountInServer.map(v => v), target: firstMountFilters })
guard({ source: $mountProductsPage, filter: (() => true), target: unLockFetch })


const mountWithParams = mountProductsPage.map(({ pathname, search }) => parseUrl(pathname, search))

// Фетч товаров:
forward({ from: mountWithParams, to: [$setFetchProducts, $setFieldsWithReset] })

// Фетч фильтров, на сервере игнорируем:
guard({
  source: merge([ mountWithParams, firstMountFilters.map(({ pathname, search }) => parseUrl(pathname, search)) ]),
  filter: () => !config.ssr,
  target: $debounceFetchFilters
})
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
export const $addOneFilterValue = createEvent<{ key: keyof QueryFields, value: string | number | boolean}>()
forward({
  from: sample($allFields, $addOneFilterValue, (query, { key, value }) => {
    switch (key) {
      case 'price_from':
      case 'price_to':
      case 'sale_from':
      case 'sale_to': return ({ ...query, [key]: value })
      case 'brands':
      case 'sizes': return ({ ...query, [key]: [...query[key], value] })
      case 'categories': return ({ ...query, [key]: [...query[key], value as number ] })
      default: return null
    }
  }),
  to: [$setFields, $debounceFetchProducts, $setPushUrl, $debounceFetchFilters]
})
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
  to: [ $setFields, $debounceFetchProducts, $setPushUrl, $debounceFetchFilters ]
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












