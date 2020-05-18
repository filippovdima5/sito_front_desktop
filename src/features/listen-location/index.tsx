import { useLocation , useHistory } from 'react-router'
import { useEvent } from 'effector-react/ssr'
import { $setPathname } from '../../stores/location-listen'
import { useEffectSafe } from '../../hooks/use-effect-safe'
import { $setReplace } from '../products-page/new-store'


export function ListenLocation() {
  const { pathname } = useLocation()
  const { replace } = useHistory()
  
  const setPathname = useEvent($setPathname)
  const setReplace = useEvent($setReplace)
  
  useEffectSafe(() => {
    setReplace(replace)
  }, [])
  
  useEffectSafe(() => {
    setPathname(pathname)
  }, [pathname])
  
  return null
}
