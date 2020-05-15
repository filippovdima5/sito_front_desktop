import { createStore, createEvent,  combine } from 'lib/effector'
import { $sexLine } from './user'


type BaseRoute = 'home' | 'products' | 'brands'



export const $setUrlInfo = createEvent<{path: string, search: string}>()

export const $baseRoute = createStore<BaseRoute>('home')
export const $search = createStore<string>('')


$search.on($setUrlInfo, (_, { search }) => {
  if (!search) return ''
  return search.replace('?', '')
})
$baseRoute.on($setUrlInfo, (_, { path }) => {
  if (path.includes('brands')) return 'brands'
  if (path.includes('products')) return 'products'
  return 'home'
})


export const $baseLink = combine({ $search, $baseRoute, $sexLine }, ({ $search, $baseRoute, $sexLine }) => {
  const path = `/${$baseRoute}`
  const search =  Boolean($search) ? `?${$search}` : ''
  const sex = Boolean($sexLine) ? `/${$sexLine}` : ''
 
  return ({
    readyLink: path + sex + search,
    linkParams: {
      baseRoute: $baseRoute,
      sexLine: $sexLine,
      search: $search
    }
  })
})



