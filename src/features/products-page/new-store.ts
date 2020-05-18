import { createStore, createEvent, sample, createEffect, guard, forward, merge } from 'lib/effector'
import { createThrottle } from 'effector-throttle'
import { createDebounce } from 'effector-debounce'
import { GetProductsParams, ShortProduct } from '../../api/v2/types'
import config from '../../config'
import { apiV2 } from '../../api'
import { SexId } from '../../types'
import { encodeProductsUrl, parseUrl } from './lib'
import { QueryFields, StatusPage } from './types'
import { defaultFields, sortTypes, valuesOfFilterButtons } from './constants'



// region Fields:
const $allFields = createStore<Required<QueryFields>>(defaultFields)
const $setFields = createEvent<QueryFields | null>()
$allFields.on($setFields, (state, payload) => {
  if (payload !== null) return ({ ...state, ...payload })
})


// endregion



// region stores with data:
export const $statusPageProducts = createStore<StatusPage>('START')
export const $products = createStore<Array<ShortProduct>>([])
export const $totalPages = createStore<number>(0)
export const $loading = createStore<boolean>(false)
// endregion



// region fetchProducts:
/**При передачи любого поля будет загрузка:*/
const $setFetchProducts = createEvent<QueryFields | null>()
const $throttleFetchProducts = createEvent<QueryFields | null>()

const $paramsForFetchProducts = createStore<GetProductsParams | null>(null)

$paramsForFetchProducts.on(
  sample($allFields, merge([
    $setFetchProducts,
    createThrottle($throttleFetchProducts, 2000)
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

forward({ from: $paramsForMount.updates, to: [$setFetchProducts, $setFields] })
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
  to: [ $setFields, $throttleFetchProducts, $setPushUrl ]
})
// endregion




















