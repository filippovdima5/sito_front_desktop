import React from 'react'
import styles from './styles.module.scss'


const filtersMap = {
  brands: 'Бренды',
  categories: 'Категории',
  colors: 'Цвета',
  sizes: 'Размеры',
  prices: 'Цена',
  sales: 'Скидка',
  favorite: 'Топовые'
} as const

type Props = {
  title: 'favorite' | string,
  check: boolean,
  disabled: boolean,
  event: () => void,
}

export function CheckRow(props: Props) {
  return (
    <label className={`${styles.checkRow} ${props.disabled && styles.disabled}`}>
      <input
        readOnly={true}
        checked={props.check}
        onClick={props.event}
        disabled={props.disabled}
        type={'checkbox'}
        className={styles.checkbox}
      />
      <span className={styles.icon}/>
      <span className={styles.title}>{props.title === 'favorite' ? filtersMap[props.title] : props.title}</span>
    </label>
  )
}
