import { createStore, createEvent, guard, restore } from 'lib/effector'
import { SexId } from '../types'
import { findSexIdInPath } from '../lib'
import { $fetchPopularBrands } from './popular-brands'


// region mainState:
export const $setPush = createEvent<any>()
export const $push = restore($setPush, (url: string) => { console.info(url) })

export const $setPathname = createEvent<string>()
//const $pathname = restore($setPathname, '/')

const $sexId = createStore<SexId | null>(null)
$sexId.on($setPathname, (sex, pathname) => findSexIdInPath(pathname))
// endregion




// region fetches on CLIENT:
// А на сервере, при инициализации, прям в koa:

// 1. Popular-brands:
guard({
  source: $sexId.map(sexId => ({ sexId })),
  filter: $sexId.map(sexId => sexId !== null),
  target: $fetchPopularBrands,
})



// 2. Meta-tags (by pathname debounce) :

// -----


// 3. Set new SEX_ID ( bu $sexID ):

// -----

// endregion



