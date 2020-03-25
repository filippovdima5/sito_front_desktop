import React from 'react'
import styles from './styles.module.scss'


type Props = {
  title: string,
  onClick: () => void,

  visible?: boolean,
}

export function BtnHelp(props: Props) {
  if (props.visible === false) return null
  return (
    <div className={styles.wrapBtn}>
      <button onClick={props.onClick} className={styles.btn}>
        <span className={styles.title}>
          {props.title}
        </span>
      </button>
    </div>
  )
}