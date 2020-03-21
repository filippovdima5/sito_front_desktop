import React from 'react'
import styles from './styles.module.scss'


export function Title({ title }: {title: string}) {
  return (
    <span className={styles.span}>
      {title}
    </span>
  )
}