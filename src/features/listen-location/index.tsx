import { useLocation } from 'react-router'
import { useEvent } from 'effector-react/ssr'
import { $setPathname } from '../../stores/location-listen'
import { useEffectSafe } from '../../hooks/use-effect-safe'


export function ListenLocation() {
  const { pathname } = useLocation()
  const setPathname = useEvent($setPathname)
  
  useEffectSafe(() => {
    setPathname(pathname)
  }, [pathname])
  
  return null
}
