import {  createEffect, createEvent, createStore, forward, guard, merge } from 'lib/effector'
import { createDebounce } from 'effector-debounce'
import { BrandByChar, GetBrandsByCharParams } from '../../api/v2/types'
import { SexId } from '../../types'
import { apiV2 } from '../../api'
import { sortByChar } from '../products-page/lib'
import config from '../../config'



export const $brands = createStore<Array<BrandByChar>>([])
export const $loadingBrands = createStore<boolean>(false)


const $inServer = createStore<boolean>(false)
const unLockFetch = createEffect({ handler: () => config.ssr })
$inServer.on(unLockFetch.done, (_, { result }) => result)


export const $setFetchBrands = createEvent<{ sex_id: SexId, phrase?: string }>()
export const $mountBrandsPage = createEvent<{ sex_id: SexId }>()
const mountBrandPage = createEvent<{ sex_id: SexId }>()


guard({ source: $mountBrandsPage, filter: $inServer.map(inServer => !inServer), target: mountBrandPage })
guard({ source: $mountBrandsPage, filter: (() => true) , target: unLockFetch })


const fetchBrands = createEffect({
  handler: (params: GetBrandsByCharParams) => apiV2.getBrandsByChar(params)
})


forward({
  from: merge([
    createDebounce($setFetchBrands, 1000),
    mountBrandPage
  ]),
  to: fetchBrands
})


$brands.on(fetchBrands.done, (_, { result: { data } }) => data.sort((a, b) => sortByChar(a.char) - sortByChar(b.char)))
$loadingBrands.on(fetchBrands.pending, (_, p) => p)

