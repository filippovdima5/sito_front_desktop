import { createStore, createEvent, guard } from 'lib/effector'
import { SexId } from '../types'
import { findSexInPath } from '../lib'
import { $fetchPopularBrands } from './popular-brands'



const $sexId = createStore<SexId | null>(null)


export const $setPathname = createEvent<string>()


$sexId.on($setPathname, (sex, pathname) => {
  const newSex = findSexInPath(pathname)
  if (newSex !== sex) {
    if (newSex === 'men') return 1
    if (newSex === 'women') return 2
  }
})


// а на клиенте ничего не загрузится, так как стор уже будет задан,
const $resetSexEvent = $sexId.updates



// region events by update sexId:
guard({
  source: $resetSexEvent.map(sexId => ({ sexId })),
  filter: $sexId.map(sexId => sexId !== null),
  target: $fetchPopularBrands,
})
// endregion
