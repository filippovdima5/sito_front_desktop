import { allSettled, Scope } from 'effector/fork'


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
      }
    }
  }
  
  return null
}
