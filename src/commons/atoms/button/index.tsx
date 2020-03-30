import React from 'react'
import styles from './styles.module.scss'


type Props = {
  title: string,
  className?: string,
  onClick?: () => void,
}

export function Button({ title, className, onClick }: Props) {
  return(
    <button
      onClick={onClick}
      className={`${className} ${styles.button}`}
    >
      {title}
    </button>
  )
}
