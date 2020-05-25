import { createStore, createEvent, createEffect, forward, sample } from 'lib/effector'
import { SetLikeParams } from '../../../api/v2/types'
import { apiV2 } from '../../../api'
import { mountCookie } from '../../../stores/location-listen'


export const $likeIds = createStore<Array<string>>([])
$likeIds.on(mountCookie.done, (state, { result: { data: { like_products } } }) => like_products)


export const $setLike = createEvent<string>()

const fetchSetLike = createEffect({
  handler: (params: SetLikeParams) => apiV2.session.setLike(params)
})

const setLike = sample($likeIds, $setLike, ( likes, newLike ) => {
  if (likes.includes(newLike)) return ({ id: newLike, type_set: 'del' as const })
  return ({ id: newLike, type_set: 'add' as const })
})
$likeIds.on(setLike, (state, payload) => {
  if (payload.type_set === 'del') return state.filter(item => item !== payload.id)
  return [...state, payload.id]
})

forward({
  from: setLike,
  to: fetchSetLike
})

