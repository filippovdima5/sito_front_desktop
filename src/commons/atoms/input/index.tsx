import React, { CSSProperties } from 'react'
import styles from './styles.module.scss'


type Props = {
  type: 'text' | 'tel',

  value?: string,
  onChange?: (event: any) => void,
  placeholder?: string,
  isPlaceholder?: boolean,
  style?: CSSProperties,
  className?: string,
  ariaLabel?: string,
  onBlur?: () => void,
  onFocus?: () => void,
}

export function Input(props: Props) {

  return(
    <div className={styles.wrapInput}>
      <input
        value={props.value}
        type={props.type}

        onBlur={props.onBlur}
        onFocus={props.onFocus}

        aria-label={props.ariaLabel}
        onChange={props.onChange}
        placeholder={props.placeholder}
        style={props.style}
        className={
          `${props.className}
           ${styles.input}
           ${props.isPlaceholder ? styles.inputPlaceholderYes : styles.inputPlaceholderNo}`

        }
      />
    </div>
  )
}
