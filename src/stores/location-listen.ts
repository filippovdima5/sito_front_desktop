import { createStore, createEvent, guard, createEffect, forward } from 'lib/effector'
import { createDebounce } from 'effector-debounce'
import { SexId } from '../types'
import { findSexIdInPathNotStrict } from '../lib'
import { apiV2 } from '../api'
import config from '../config'
import { $fetchPopularBrands } from './popular-brands'


// region mainState:
export const $mountClientApp = createEvent<{ pathname: string }>()

export const $setPathname = createEvent<string>()
//const $pathname = restore($setPathname, '/')


const $sexId = createStore<SexId | null>(null)
$sexId.on($setPathname, (sex, pathname) => findSexIdInPathNotStrict(pathname))
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

// -----



// endregion



