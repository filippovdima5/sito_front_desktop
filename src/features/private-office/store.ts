import { createStore, createEffect, createEvent, forward } from 'lib/effector'
import { ShortProduct } from '../../api/v2/types'
import { apiV2 } from '../../api'



export const $fetchLikeProducts = createEvent()
export const $likeProducts = createStore<Array<ShortProduct>>([])
export const $loadingLikeProducts = createStore(false)
export const $stateFetchProducts = createStore<'START' | 'LOADING' | 'EMPTY' | 'READY'>('START')


const fetchLikeProducts = createEffect({
  handler: () => apiV2.getLikeProducts()
})

forward({
  from: $fetchLikeProducts,
  to: fetchLikeProducts
})

$likeProducts.on(fetchLikeProducts.done, (state, { result: { data } }) => data)
$loadingLikeProducts.on(fetchLikeProducts.pending, (_, p) => p)
$stateFetchProducts.on(fetchLikeProducts.pending, (_, p) => {
  if (p) return 'LOADING'
})
$stateFetchProducts.on(fetchLikeProducts.done, (state, { result: { data } }) => {
  if (data.length) return 'EMPTY'
  return 'READY'
})


