import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useStore, useEvent } from 'effector-react/ssr'
import { useLocation } from 'react-router'
import { useEffectSafe } from '../../../hooks/use-effect-safe'
import { $setSearch, $modSearch  } from '../store'
import { findSexIdInPathNotStrict } from '../../../lib'
import styles from './styles.module.scss'


export function Input() {
  const inputRef = useRef<HTMLInputElement>(null)
  const modSearch = useStore($modSearch)
  const setSearch = useEvent($setSearch)
  
  const { pathname } = useLocation()
  const sexId = useMemo(() => findSexIdInPathNotStrict(pathname), [pathname])
  
  
  useEffectSafe(() => {
    if (modSearch) (inputRef.current as HTMLInputElement).focus()
    else (inputRef.current as HTMLInputElement).blur()
  }, [ modSearch ])

  const [value, setValue] = useState<string>('')

  const handleChange = useCallback((event: any) => {
    const phrase = event.currentTarget.value
    setValue(phrase)
    setSearch({ phrase, sex_id: sexId })
  }, [setSearch, sexId])


  return (
    <input
      onMouseOver={() => {(inputRef.current as HTMLInputElement).focus()}}
      onMouseOut={() => (inputRef.current as HTMLInputElement).blur()}
      value = {modSearch ? value : 'Поиск по ключевому слову'}
      onChange = { handleChange }
      ref = { inputRef }
      placeholder={ 'Поиск по ключевому слову' }
      className={ modSearch ? styles.input : styles.placeholderInput }
      type={ 'text' }
    />
  )
}

