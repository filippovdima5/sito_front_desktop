import { useLocation , useHistory } from 'react-router'
import { useEvent } from 'effector-react/ssr'
import { $setPathname, $mountClientApp } from '../../stores/location-listen'
import { useEffectSafe } from '../../hooks/use-effect-safe'
import { $setReplace } from '../products-page/store'


export function ListenLocation() {
  const { pathname, search } = useLocation()
  const { replace } = useHistory()
  
  const setPathname = useEvent($setPathname)
  const setReplace = useEvent($setReplace)
  const mountClientApp = useEvent($mountClientApp)
  
  //  ОДИН РАЗ, ПРИ МАУНТЕ КЛИЕНТСКОЙ ЧАСТИ:
  useEffectSafe(() => {
    setReplace(replace)
    mountClientApp({ pathname })
  }, [])
  
  
  // При любом изменении pathname:
  useEffectSafe(() => {
    setPathname({ pathname, search })
  }, [pathname, search])
  
  return null
}
