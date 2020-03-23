import { combine, createEffect, createEvent, createStore, guard, merge, restore } from 'lib/effector'
import { RouteComponentProps } from 'react-router'
import { ShortProduct, TypesSortProducts } from '../../api/types'
import { StatusPage, MainState } from './types'
import { setItemToArray } from './lib'


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
  page: null,
  sort: null,
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
export const $setSomeFilter = createEvent<{key: keyof Omit<MainState, 'sort' | 'limit' | 'page'>, value: string | number | boolean | null}>()

$mainState.on($setSomeFilter, (state, { key, value }) => {
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
// endregion setsSomeFilter


// region setsSomeProductsParams:
export const $setPage = createEvent<number>()
$mainState.on($setPage, (state, page) => ({ ...state, page }))

export const $setSort = createEvent<TypesSortProducts>()
$mainState.on($setSort, (state, sort) => ({ ...state, sort }))
// endregion setsSomeProductsParams



















export const $productsStore = createStore<Array<ShortProduct>>([])
export const $loadingProducts = createStore<boolean>(false)
export const $statusPageProducts = createStore<StatusPage>('START')
export const $lengthSkeletonData = createStore<number>(20)

