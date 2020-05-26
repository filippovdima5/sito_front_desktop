import React, { useMemo } from 'react'
import { Link , useLocation } from 'react-router-dom'
import { useEvent, useStore } from 'effector-react/ssr'
import { $popularBrands } from '../../../../stores/popular-brands'
import { $mountProductsPage } from '../../../products-page/store'
import { findSexInPath } from '../../../../lib'
import styles from './styles.module.scss'


export function BrandsContent() {
  const { pathname } = useLocation()
  const mountProductsPage = useEvent($mountProductsPage)
  
  const sexPath = useMemo(() => findSexInPath(pathname), [pathname])
  const brands = useStore($popularBrands)
  

  if (sexPath === null) return null
  
  return (
    <div  className={styles.brandsContent}>
      {brands.map(brand => (
        <Link
          onClick={() =>  mountProductsPage({ pathname: `/${sexPath}/products`, search: `?brands=${brand}` })}
          key={brand} to={`/${sexPath}/products/?brands=${brand}`} className={styles.brand}>
          {brand}
        </Link>
      ))}
      <Link to={`/${sexPath}/brands`} className={styles.allBrand}>Показать все бренды</Link>
    </div>
  )
}
