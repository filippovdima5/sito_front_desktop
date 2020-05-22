import { createEffect, createEvent, forward, createStore } from 'lib/effector'
import { createDebounce } from 'effector-debounce'
import { SexId } from '../../types'
import { GetFiltersParams } from '../../api/v2/types'
import { apiV2 } from '../../api'
import { sortBrands } from '../products-page/lib'


// region
export const $brands = createStore<Array<string>>([])
export const $stateOfLoadBrands = createStore<'START' | 'READY' | 'EMPTY' | 'LOADING'>('START')
export const $loadingBrands = createStore<boolean>(false)


export const $setSearchBrands = createEvent<{
  sex_id: SexId,
  categories?: Array<number>,
  brand_search?: string,
}>()


const setSearchBrands = createDebounce($setSearchBrands, 1000)
const fetchBrands = createEffect({ handler: (params: GetFiltersParams) => apiV2.filters.brands(params) })
forward({
  from: setSearchBrands,
  to: fetchBrands
})

$brands.on(fetchBrands.done, (_, { result: { data } }) => sortBrands(data))
$loadingBrands.on(fetchBrands.pending, (_, p) => p)

$stateOfLoadBrands.on(fetchBrands.pending, (_, p) => {
  if (p) return 'LOADING'
})
$stateOfLoadBrands.on(fetchBrands.done, (_, { result: { data } }) => {
  if (data.length === 0) return 'EMPTY'
  return 'READY'
})
// endregion


