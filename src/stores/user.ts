import { createStore, createEffect,  guard,  createEvent, merge, sample } from 'lib/effector'
import { UserRequest } from '../api/v1/types'
import { api } from '../api/v1'
import config from '../config'



type GenderInfo = { sexId: 1, sexLine: 'men' } | { sexId: 2, sexLine: 'women' }


// region fetching:
export const $fetchUser = createEvent()
const fetchUserEffect = createEffect({
  handler: api.user.getUser
})
const $fetchedUser = createStore<UserRequest | null>(null)

guard({
  source: $fetchUser,
  filter: () => true,
  target: fetchUserEffect,
})

$fetchedUser.on(fetchUserEffect.done, (_, { result: { data } }) => data)

const $user = $fetchedUser.map(state => {
  if (state === null) return undefined
  return {
    sexId: state.sex_id,
    likes: state.likes
  }
})
// endregion fetching



// region Gender:
export const $setGender = createEvent<'men' | 'women' | 1 | 2>()


const targetSexUpdate = merge([$user.updates.map(payload => {
  if (payload?.sexId) return payload.sexId
  return undefined
}), $setGender])

export const $genderInfo = createStore<GenderInfo | null>(null)

$genderInfo.on(targetSexUpdate, (state, payload) => {
  if (!payload || payload === state?.sexId) return undefined
  switch (payload) {
    case 1:
    case 'men': return { sexId: 1, sexLine: 'men' }
    case 2:
    case 'women': return { sexId: 2, sexLine: 'women' }
    default: return undefined
  }
})
// endregion Gender


// region Likes:
export const $likes = createStore<Array<string>>([])
$likes.on($user.updates, (state, user) => {
  if (!Boolean(user) || !Boolean(user?.likes)) return []
  return user?.likes
})


export const $setLike = createEvent<string>()
const targetSetLike = sample($likes, $setLike, (likes, idProduct) => {
  if (likes.includes(idProduct)) return likes.filter(id => id !== idProduct)
  return [...likes, idProduct]
})
$likes.on(targetSetLike, (_, payload) => payload)
targetSetLike.watch(likes => {
  api.user.setUser({ likes })
})
// endregion Likes


// region setFetchUser:
$setGender.watch(payload => {
  if (config.ssr) return undefined
  switch (payload) {
    case 1:
    case 'men': api.user.setUser({ sex_id: 1 }); break
    case 2:
    case 'women': api.user.setUser({ sex_id: 2 }); break
    default: return undefined
  }
})
// endregion setFetchUser

