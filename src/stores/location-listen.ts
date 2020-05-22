import { createStore, createEvent, guard, createEffect, forward } from 'lib/effector'
import { createDebounce } from 'effector-debounce'
import { SexId } from '../types'
import { findSexIdInPathNotStrict } from '../lib'
import { apiV2 } from '../api'
import config from '../config'
import { MetaTags } from '../api/v2/types'
import { $fetchPopularBrands } from './popular-brands'


// region mainState:
export const $mountClientApp = createEvent<{ pathname: string }>()

export const $setPathname = createEvent<{ pathname: string, search: string }>()
//const $pathname = restore($setPathname, '/')


const $sexId = createStore<SexId | null>(null)
$sexId.on($setPathname, (sex, { pathname }) => findSexIdInPathNotStrict(pathname))
// endregion



// region mountCookie
export const mountCookie = createEffect({ handler: ({ sexId }: { sexId?: SexId }) => apiV2.session.mountOrGetInfo({ sexId }) })
const debounceMountCookie = createEvent<{ sexId?: SexId }>()
forward({
  from: $mountClientApp.map(payload => ({ sexId: findSexIdInPathNotStrict(payload.pathname) })),
  to: debounceMountCookie
})
guard({
  source: $sexId.updates.map(sexId => ({ sexId: sexId ?? undefined })),
  filter: () => !config.ssr,
  target: debounceMountCookie
})
forward({
  from: createDebounce(debounceMountCookie, 200),
  to: mountCookie
})
// endregion



// region popular brands:
guard({
  source: $sexId.updates.map(sexId => ({ sexId })),
  filter: $sexId.map(sexId => sexId !== null),
  target: $fetchPopularBrands,
})
// endregion




// 2. Meta-tags (by pathname debounce) :
export const $metaTags = createStore<MetaTags>({
  link: '/',
  title: 'SITO - сайт выгодных скидок. Каталог акций в интернет-магазинах.',
  description: 'Все скидки рунета на SITO: поиск выгодных цен на одежду, обувь и аксессуары в интернет-магазинах. Агрегатор скидок – акции от 50%'
})
const $paramsForFetchTags = createStore('/')
$paramsForFetchTags.on($setPathname, (state, { pathname, search }) => {
  let link = pathname
  if (!search) return link
  let foundFields: any = {}
  try {
    foundFields = Object.fromEntries(
      decodeURI(search).replace('?', '')
        .split('&')
        .map(i => i.split('='))
    )
  } catch (e) {
    console.error(e)
    return link
  }
  Object.entries(foundFields).forEach(([key, value]) => {
    if (key === 'categories') {
      if (!value) return
      const cats = (value as string).split(',')
      link = `${link}?categories=${cats[cats.length - 1]}`
    }
    return
  })
  return link
})

const fetchMetaTags = createEffect({
  handler: (params: { link: string }) => apiV2.getMetaTags(params)
})

forward({
  from: $paramsForFetchTags.updates.map(link => ({ link })),
  to: fetchMetaTags
})

$metaTags.on(fetchMetaTags.done, (state, { result: { data } }) => data)
// -----



// endregion



