import { createEffect, createEvent, createStore, forward } from 'lib/effector'
import { PopularBrandsParams } from '../api/v2/types'
import { apiV2 } from '../api'
import { SexId } from '../types'


const limit = 45

export const $popularBrands = createStore<Array<string>>([])
export const $fetchPopularBrands = createEvent<{ sexId: SexId }>()
const fetchPopularBrands = createEffect({
  handler: (params: PopularBrandsParams) => apiV2.getPopularBrands(params)
})

forward({
  from: $fetchPopularBrands.map(({ sexId }) => ({ sexId, limit })),
  to: fetchPopularBrands
})

$popularBrands.on(fetchPopularBrands.done, (_, { result: { data } }) => data)
