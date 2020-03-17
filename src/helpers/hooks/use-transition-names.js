import { useRef } from 'react'


const initClassNamesAnimateFilters = (styles) => ({
  enter: styles._enter,
  enterActive: styles._enter_active,
  enterDone: styles._enter_is_done,
  exit: styles._exit,
  exitActive: styles._exit_active,
  exitDone: styles._exit_is_done
})

export function useTransitionNames(animatingStyles) {
  const classNames = useRef(initClassNamesAnimateFilters(animatingStyles))
  return classNames.current
}