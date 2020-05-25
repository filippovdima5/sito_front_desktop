import { useLocation , useHistory } from 'react-router'
import { useEvent } from 'effector-react/ssr'
import { useMemo } from 'react'
import { $setUrl, $mountClientApp } from '../../stores/location-listen'
import { useEffectSafe } from '../../hooks/use-effect-safe'
import { $setReplace } from '../products-page/store'
import { findSexIdInPathNotStrict } from '../../lib'


export function ListenLocation() {
  const { pathname, search } = useLocation()
  const { replace } = useHistory()
  
  const setReplace = useEvent($setReplace)
  const mountClientApp = useEvent($mountClientApp)
  const setUrl = useEvent($setUrl)

  
  // При маунте клиента:
  useEffectSafe(() => {
    setReplace(replace)
    mountClientApp({ pathname })
  }, [])
  
  
  //При любом изменении pathname или search:
  useEffectSafe(() => {
    setUrl({ pathname, search })
  }, [pathname, search])
  
  
  // При изменении sexId:
  const sexId = useMemo(() => findSexIdInPathNotStrict(pathname), [pathname])
  useEffectSafe(() => {
    if (sexId) {
    
    }
  }, [sexId])
  
  return null
}
