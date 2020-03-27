import {  createEffect, createEvent, createStore, merge, guard, sample } from 'lib/effector'
import { AllBrandsRequest } from '../../api/types'
import { api } from '../../api'
import { $sexId } from '../../stores/user'


const $brands = createStore<Array<AllBrandsRequest>>([])
export const $filteredBrands = createStore<Array<AllBrandsRequest>>([])

const loadBrands = createEffect({
  handler: (params: {sexId: 1 | 2}) => api.simple.allBrands({ sexId: params.sexId })
})
$brands.on(loadBrands.done, (_, { result: { data } }) => data )
$filteredBrands.on(loadBrands.done, (_, { result: { data } }) => data)


export const $fetchBrands = createEvent<{ sexId: 1 | 2 }>()
guard({
  source: $fetchBrands,
  filter: () => true,
  target: loadBrands
})

export const $mountBrandsPage = createEvent()
guard({
  source: sample($sexId, $mountBrandsPage, source => ({ sexId: source })),
  filter: $sexId.map(state => state !== null),
  target: loadBrands
})



export const $setFilterString = createEvent<string>()
export const filterString = createStore<string>('')
filterString.on($setFilterString, (_, string) => string)


const filterSample = sample($brands, filterString, (brands, filterString) => {
  if (filterString.length < 1) return brands
  
  const firstChar = filterString.charAt(0)
  const oneGroup = brands.filter(({ char }) => (char.toLowerCase() === firstChar.toLowerCase()))
  return oneGroup.map(item => ({
    ...item,
    brands: item.brands.filter(item => item._id.toLowerCase().includes(filterString.toLowerCase()))
  }))
})


$filteredBrands.on(filterSample.updates, (_, payload) => payload)


export const $loadingBrands = createStore<boolean>(false)
$loadingBrands.on(loadBrands, () => true)
$loadingBrands.on(merge([loadBrands.done, loadBrands.fail]), () => false)
