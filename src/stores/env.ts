import { createStore, createEvent,  combine, createEffect, guard } from 'lib/effector'
import { $sexLine } from './user'
import { sexStrToId } from '../helpers/lib'
import { SeoReqParams, SeoRequest } from '../api/types'
import { api } from '../api'


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
 const path = `/${$baseRoute}`;
 const search =  Boolean($search) ? `?${$search}` : '';
 const sex = Boolean($sexLine) ? `/${$sexLine}` : '';
 
 return ({
   readyLink: path + sex + search,
   linkParams: {
     baseRoute: $baseRoute,
     sexLine: $sexLine,
     search: $search
   }
 })
})


export const $seo = createStore<SeoRequest>({
  title: 'SITO - сайт выгодных скидок. Каталог акций в интернет-магазинах.',
  description: 'Все скидки рунета на SITO: поиск выгодных цен на одежду, обувь и аксессуары в интернет-магазинах. Агрегатор скидок – акции от 50%'
})
const fetchSeo = createEffect({
  handler: (params: SeoReqParams) => api.seo.getSeo(params)
})
$seo.on(fetchSeo.done, (state, { result: { data } }) => data)


const seoParams =  $baseLink.map(clock => {
  const sexId = clock.linkParams.sexLine !== null ? sexStrToId(clock.linkParams.sexLine) : null
  const path = clock.linkParams.baseRoute as string
  const search = clock.linkParams.search
  
  return ({ sexId, path, search })
})

guard({
  source: seoParams,
  filter: () => true,
  target: fetchSeo
})

