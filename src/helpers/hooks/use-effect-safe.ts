/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'


// Версия useEffect для вызова функции с актуальными зависимостями
// Не может возвращать функцию отписки. Для отписок следуюет использовать обычный useEffect
// Бессмысленно вызывать без массива зависимостей, поэтому второй аргумент обязательный
export const useEffectSafe = (effect: () => void | undefined, triggers: any[]) => {
  const callbackRef = useRef(effect)
  useEffect(() => {
    callbackRef.current = effect
  })
  useEffect(() => {
    callbackRef.current()
  }, triggers)
}
