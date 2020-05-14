import { createStore, createEvent,  combine, createEffect, guard, merge } from 'lib/effector'
import { sexStrToId } from '../lib'
import { SeoReqParams, SeoRequest } from '../api/types'
import { api } from '../api'
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


// region Seo:
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
  const { search } = clock.linkParams
  
  return ({ sexId, path, search })
})

guard({
  source: seoParams,
  filter: () => true,
  target: fetchSeo
})
// endregion Seo


// region PopularChamps:
export const $popularBrands = createStore<Array<string>>([])
export const $setLoadPopularBrands = createEvent<{ sexId: 1 | 2 | null }>()
export const $loadingPopularBrands = createStore<boolean>(false)

const fetchPopularBrands = createEffect({
  handler: (params: { sexId: 1 | 2 | null }) => api.simple.popularBrands(params)
})

$popularBrands.on(fetchPopularBrands.done, (_, { result: { data } }) => data)
$loadingPopularBrands.on(fetchPopularBrands.pending, () => true)
$loadingPopularBrands.on(merge([fetchPopularBrands.done, fetchPopularBrands.fail]), () => false)


guard({
  source: $setLoadPopularBrands.map(payload => payload),
  filter: () => true,
  target: fetchPopularBrands
})
// endregion PopularChamps

