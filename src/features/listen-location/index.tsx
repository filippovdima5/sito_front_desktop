import { useLocation , useHistory } from 'react-router'
import { useEvent } from 'effector-react/ssr'
import { $setPathname, $setPush } from '../../stores/location-listen'
import { useEffectSafe } from '../../hooks/use-effect-safe'



export function ListenLocation() {
  const { pathname } = useLocation()
  const { push } = useHistory()
  
  const setPathname = useEvent($setPathname)
  const setPush = useEvent($setPush)
  
  useEffectSafe(() => { setPush(push) }, [])
  
  useEffectSafe(() => {
    setPathname(pathname)
  }, [pathname])
  
  return null
}
