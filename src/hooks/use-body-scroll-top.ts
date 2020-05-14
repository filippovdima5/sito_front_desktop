import { useEffect } from 'react'
import config from '../config'


export const useBodyScrollTop = (): void => {
  useEffect(() => {
    if (!config.ssr) document.body.scrollTo(0, 0)
  }, [])
}
