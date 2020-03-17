import React from 'react'
import styles from './styles.module.scss'


type Props = {
  title: string,
  className?: string
}

export function Button({ title, className }: Props) {
  return(
    <button
      className={`${className} ${styles.button}`}
    >
      {title}
    </button>
  )
}
