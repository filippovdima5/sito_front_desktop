import React, { useMemo } from 'react'
import { Link , useLocation } from 'react-router-dom'
import {  useStore } from 'effector-react/ssr'
import { $popularBrands } from '../../../../stores/popular-brands'
import { findSexInPath } from '../../../../lib'
import styles from './styles.module.scss'


export function BrandsContent() {
  const { pathname } = useLocation()
  const sex = useMemo(() => findSexInPath(pathname), [pathname])
  const brands = useStore($popularBrands)
  
  // todo: Дизайн: Нужна заглушка
  if (sex === null) return (
    <div>Нет информации</div>
  )
  
  return (
    <div  className={styles.brandsContent}>
      {brands.map(brand => (
        <Link key={brand} to={`/${sex}/products/?brands='${brand}'`} className={styles.brand}>
          {brand}
        </Link>
      ))}
      <Link to={'/brands'} className={styles.allBrand}>Показать все бренды</Link>
    </div>
  )
}
