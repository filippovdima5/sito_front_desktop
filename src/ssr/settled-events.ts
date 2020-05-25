import { allSettled, Scope } from 'effector/fork'
import { findSexIdInPath } from '../lib'


type Params = {
  scope: Scope,
  events: Array<any>,
  path: string,
  search: string,
}


export async function settledEvents({ events, path, scope, search }: Params): Promise<null> {
  if (events.length > 0) {
    switch (events[0].shortName) {
      case '$mountProductsPage': {
        await allSettled(events[0],  { scope, params: { pathname: path, search: search ? `?${search}` : ''  } })
        break
      }
      case '$mountBrandsPage': {
        await allSettled(events[0], { scope, params: { sex_id: findSexIdInPath(path) } })
      }
    }
  }
  
  return null
}
