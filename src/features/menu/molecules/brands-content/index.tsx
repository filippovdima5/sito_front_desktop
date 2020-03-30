import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from 'effector-react/ssr'
import { $popularBrands } from '../../../../stores/env'
import { $genderInfo } from '../../../../stores/user'
import styles from './styles.module.scss'


export function BrandsContent() {
  const brands = useStore($popularBrands)
  const genderInfo = useStore($genderInfo)
  const sexLine = useMemo(() => {
    if (genderInfo === null) return ''
    return genderInfo.sexLine ?? ''
  }, [genderInfo])
  
  
  return (
    <div  className={styles.brandsContent}>
      {brands.map((item, index) => (
        <Link key={index} to={`/products/${sexLine}?brands=${item}`} className={styles.brand}>
          {item}
        </Link>
      ))}
      <Link to={'/brands'} className={styles.allBrand}>Показать все бренды</Link>
    </div>
  )
}
