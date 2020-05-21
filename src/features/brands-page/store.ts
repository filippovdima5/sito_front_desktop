import {  createEffect, createEvent, createStore, forward, merge } from 'lib/effector'
import { createDebounce } from 'effector-debounce'
import { BrandByChar, GetBrandsByCharParams } from '../../api/v2/types'
import { SexId } from '../../types'
import { apiV2 } from '../../api'
import {sortByChar} from '../products-page/lib'


export const $brands = createStore<Array<BrandByChar>>([])
export const $loadingBrands = createStore<boolean>(false)

export const $mountBrandsPage = createEvent<{ sex_id: SexId }>()
export const $setFetchBrands = createEvent<{ sex_id: SexId, phrase?: string }>()

const fetchBrands = createEffect({
  handler: (params: GetBrandsByCharParams) => apiV2.getBrandsByChar(params)
})

forward({ from: merge([createDebounce($setFetchBrands, 1000), $mountBrandsPage]), to: fetchBrands })

$brands.on(fetchBrands.done, (_, { result: { data } }) => data.sort((a, b) => sortByChar(a.char) - sortByChar(b.char)))

$loadingBrands.on(fetchBrands.pending, (_, p) => p)

