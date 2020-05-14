import { useEffect, useRef } from 'react'


type Callable =
  | ((param: void) =>  void)
  | ((param?: void) => void)
  | (() =>  void)

export function useInterval(callback: Callable, delay: number | null) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)

      return () => clearInterval(id)
    }
  }, [delay])
}
