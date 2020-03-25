import React  from 'react'
import styles from './styles.module.scss'


type Props = {
  onClick: () => void,
  title: string,
  failTitle?: string | false,
}


export function BtnDone(props: Props) {
  
  return (
    <div className={styles.wrapBtnDone}>
      <button disabled={Boolean(props.failTitle)} onClick={props.onClick} className={`${styles.button} ${props.failTitle && styles.buttonFail}`}>
        <span className={styles.wrapTitle}>
          <span className={styles.title}>
            {props.failTitle ? props.failTitle : props.title}
          </span>
        </span>
      </button>
    </div>
  )
}