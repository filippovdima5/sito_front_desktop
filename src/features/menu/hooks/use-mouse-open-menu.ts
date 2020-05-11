import { useRef } from 'react'
import { useStore, useEvent } from 'effector-react/ssr'
import { useEffectSafe } from '../../../helpers/hooks/use-effect-safe'
import { $setShowMenu, $navActive, $menuActive } from '../store'


export function useMouseOpenMenu(delay: number) {

  
  const setShowMenu = useEvent($setShowMenu)
  const navActive = useStore($navActive)
  const menuActive = useStore($menuActive)
  
  const timer = useRef<NodeJS.Timeout>()
  useEffectSafe(() => {
    if (navActive || menuActive) {
      if (timer.current) clearTimeout(timer.current)
      setShowMenu(true)
    } else {
      // @ts-ignore
      timer.current = setTimeout(() => setShowMenu(false), delay)
    }
  }, [ navActive, menuActive ])
  
  

  
}
