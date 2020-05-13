import React from 'react'
import styles from './Skeleton.module.scss'


type Props = {
  customStyle?: React.CSSProperties,
  className?: string,
}

export function Skeleton({ customStyle, className }: Props) {
  return (
    <div
      {...!!customStyle && { style: customStyle }}
      className={`${styles.Skeleton} ${className}`}
    />
  )
}

