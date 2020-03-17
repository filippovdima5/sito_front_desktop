import { useEffect, EffectCallback, DependencyList } from 'react'
import config from '../../config'


export function useDevEffect(effect: EffectCallback, deps?: DependencyList): void {
   useEffect(() => {
     if (config.local) effect()
     // eslint-disable-next-line
   }, deps)
}