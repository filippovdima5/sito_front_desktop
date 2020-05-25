import { createStore, createEvent, guard, createEffect, forward } from 'lib/effector'
import { createDebounce } from 'effector-debounce'
import { SexId } from '../types'
import { findSexIdInPathNotStrict } from '../lib'
import { apiV2 } from '../api'
import config from '../config'
import { getMetaTagsLink } from '../lib/get-meta-tags-link'
import { fetchMetaTags } from './meta-tags'
import { $fetchPopularBrands } from './popular-brands'


// region:
const $inServer = createStore(false)
const unLockFetch = createEffect({ handler: () => config.ssr })
$inServer.on(unLockFetch.done, (_, { result }) => result)

export const $setUrl = createEvent<{ pathname: string, search: string }>()
const setUrl = createEvent<{ pathname: string, search: string }>()

const $sexId = createStore<SexId | null>(null)
$sexId.on(setUrl, (_, payload) => findSexIdInPathNotStrict(payload.pathname))
export const setSexId = createEvent<SexId>()


guard({ source: $setUrl, filter: $inServer.map(inServer => !inServer), target: setUrl })
guard({ source: $sexId.updates, filter: $inServer.map(inServer => !inServer), target: setSexId })
guard({ source: $setUrl, filter: (() => true) , target: unLockFetch })


$inServer.watch(state => console.log(state, '$setInServer'))
$setUrl.watch(payload => console.log('$setUrl: ', payload))
setUrl.watch(payload => console.log('setUrl: ', payload))
setSexId.watch(payload => console.log('setSexId', payload))
// endregion


// region popular-brands:
forward({ from: setSexId.map(sexId => ({ sexId })), to: $fetchPopularBrands })
// endregion


// region meta-tags:
forward({
  from: setUrl.map(payload => ({ link: getMetaTagsLink(payload.pathname, payload.search) })),
  to: fetchMetaTags
})
// endregion



/**  Только на клиенте: */
// region mountCookie
export const $mountClientApp = createEvent<{ pathname: string }>()

export const mountCookie = createEffect({ handler: ({ sexId }: { sexId?: SexId }) => apiV2.session.mountOrGetInfo({ sexId }) })
const debounceMountCookie = createEvent<{ sexId?: SexId }>()
forward({
  from: $mountClientApp.map(payload => ({ sexId: findSexIdInPathNotStrict(payload.pathname) })),
  to: debounceMountCookie
})
guard({
  source: setSexId.map(sexId => ({ sexId: sexId })),
  filter: () => !config.ssr,
  target: debounceMountCookie
})
forward({
  from: createDebounce(debounceMountCookie, 200),
  to: mountCookie
})
// endregion

