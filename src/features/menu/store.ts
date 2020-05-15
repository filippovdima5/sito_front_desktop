import { restore, createEvent, createStore } from 'lib/effector'


export type MenuContent = 'BRANDS' | 'MEN_CATEGORIES' | 'WOMEN_CATEGORIES'


export const $setShowMenu = createEvent<boolean>()
export const $showMenu = restore($setShowMenu, false)

export const $setNavActive = createEvent<boolean>()
export const $navActive = restore($setNavActive, false)

export const $setMenuActive = createEvent<boolean>()
export const $menuActive = restore($setMenuActive, false)

export const $setMenuContent = createEvent<MenuContent | null>()
export const $menuContent = restore($setMenuContent, null)

export const $setForceClose = createEvent<boolean>()
export const $forceCloseState = createStore(false)
$forceCloseState.on($setForceClose, (_, payload) => payload)
$showMenu.on($setForceClose, () => false)


$menuContent.on($showMenu.updates, (_, payload) => {
  if (!payload) return null
})
