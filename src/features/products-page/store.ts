import { createStore } from 'lib/effector'
import { ShortProduct } from '../../api/types'
import { StatusPage } from './types'


export const $productsStore = createStore<Array<ShortProduct>>([])
export const $loadingProducts = createStore<boolean>(false)
export const $statusPageProducts = createStore<StatusPage>('START')
export const $lengthSkeletonData = createStore<number>(20)

