import React from 'react'
import { Link } from 'react-router-dom'
import { useStore } from 'effector-react/ssr'
import { $popularBrands } from '../../../../stores/env'
import styles from './styles.module.scss'


export function BrandsContent() {
  const brands = useStore($popularBrands)
  
  return (
    <div  className={styles.brandsContent}>
      {brands.map((item, index) => (
        <Link key={index} to={'/'} className={styles.brand}>
          {item}
        </Link>
      ))}
      <Link to={'/brands'} className={styles.allBrand}>Показать все бренды</Link>
    </div>
  )
}
