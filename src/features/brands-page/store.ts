import {  createEffect, createEvent, createStore, forward, sample, guard } from 'lib/effector'
import { createDebounce } from 'effector-debounce'
import { BrandByChar, GetBrandsByCharParams } from '../../api/v2/types'
import { SexId } from '../../types'
import { apiV2 } from '../../api'
import { sortByChar } from '../products-page/lib'
import config from '../../config'


export const $brands = createStore<Array<BrandByChar>>([])
export const $loadingBrands = createStore<boolean>(false)

const $paramsForFetch = createStore<{ sex_id: SexId } | null>(null)
const $mountInServer = createStore<boolean>(false)
export const $mountBrandsPage = createEvent<{ sex_id: SexId }>()
const $eventForMount = sample($mountInServer, $mountBrandsPage, (inServer, params) => {
  if (config.ssr) return params
  if (inServer) return null
  return params
})
$mountInServer.on($eventForMount, () => config.ssr)
$paramsForFetch.on($eventForMount, (state, payload) => {
  if (!payload) return
  return payload
})

const fetchBrands = createEffect({
  handler: (params: GetBrandsByCharParams) => apiV2.getBrandsByChar(params)
})

guard({
  source: $paramsForFetch.updates,
  filter: $paramsForFetch.map(state => state !== null),
  target: fetchBrands,
})


export const $setFetchBrands = createEvent<{ sex_id: SexId, phrase?: string }>()
forward({ from: createDebounce($setFetchBrands, 1000), to: fetchBrands })


$brands.on(fetchBrands.done, (_, { result: { data } }) => data.sort((a, b) => sortByChar(a.char) - sortByChar(b.char)))
$loadingBrands.on(fetchBrands.pending, (_, p) => p)

