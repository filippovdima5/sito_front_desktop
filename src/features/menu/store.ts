import { restore, createEvent } from 'lib/effector'


type MenuContent = 'BRANDS' | 'MEN_CATEGORIES' | 'WOMEN_CATEGORIES'


export const $setShowMenu = createEvent<boolean>()
export const $showMenu = restore($setShowMenu, false)

export const $setNavActive = createEvent<boolean>()
export const $navActive = restore($setNavActive, false)

export const $setMenuActive = createEvent<boolean>()
export const $menuActive = restore($setMenuActive, false)

export const $setMenuContent = createEvent<MenuContent | null>()
export const $menuContent = restore($setMenuContent, null)

