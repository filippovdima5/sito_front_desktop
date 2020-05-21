import { createStore } from 'lib/effector'
import { ShortProduct } from '../../api/v2/types'


export const $likeProducts = createStore<Array<ShortProduct>>([])
export const $loadingLikeProducts = createStore(false)

