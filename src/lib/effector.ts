import * as effector from 'effector'


export * from 'effector'
export const rootDomain = effector.createDomain('rootDomain')


export const {
  createDomain,
  createEffect,
  createEvent,
  createStore,
} = rootDomain

export const START = 'start'
export const INFO = 'info'
