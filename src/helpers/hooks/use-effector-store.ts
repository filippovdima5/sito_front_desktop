import { Subscription, useSubscription } from 'use-subscription'
import { Store } from 'effector'
import { useStoreMap as useOriginalStoreMap } from 'effector-react'
import { useMemo, useDebugValue } from 'react'

import config from 'config'

/**
 * Безопасная для сервера подписка на стор эффектора
 */
export const useEffectorStore = <T>(store: Store<T>) => {
  const subscription = useMemo<Subscription<T>>(() => ({
    getCurrentValue: () => store.getState(),
    subscribe: (setState) => store.watch(setState),
  }), [store])
  const value = useSubscription(subscription)

  useDebugValue(value)

  return value
}

/**
 * Безопасный useStoreMap для сервера
 * На клиенте использовать бессмысленно, потому что выкидывает всю оптимизацию effector'a :)
 */
const useStoreMapServer: typeof useOriginalStoreMap = (opts) => {
  const { fn, store, keys } = opts
  const state = useEffectorStore(store)
  return fn(state, keys)
}

export const useStoreMap = config.ssr ? useStoreMapServer : useOriginalStoreMap
export { useEffectorStore as useStore }
