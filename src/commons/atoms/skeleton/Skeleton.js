import React from 'react'
import styles from './Skeleton.module.scss'


export function Skeleton({ customStyle }) {
  return (<div
    {...!!customStyle && { style: customStyle }}
    className={`${styles.Skeleton}`}/>)
}

