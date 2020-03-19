import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'


const brands: Array<string> = []
for (let i = 0; i < 52; i++ ){
  brands.push('Some brand')
}

export function BrandsContent() {

  
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
