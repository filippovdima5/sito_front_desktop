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


// При ресете пола нужно подгружать инфу для нужного пола:
// На сервере это сработает один раз, когда мы установим пол,
// собственно это и нужно
// а на клиенте ничего не загрузится, так как стор уже будет задан,
// а как раз при смене пола на клиенте все подгрузится
$sexId.updates.watch(payload => console.log(payload, 'RESET_SEX'))



// region events by update sexId:
guard({
  source: $sexId.updates.map(sexId => ({ sexId })),
  filter: $sexId.map(sexId => sexId !== null),
  target: $fetchPopularBrands,
})
// endregion
