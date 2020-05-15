import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useEvent , useStore } from 'effector-react/ssr'
import { $goToONlySomeFilter } from '../../../products-page/store'
import { $genderInfo } from '../../../../stores/user'
import styles from './styles.module.scss'


export function BrandsContent() {
  const genderInfo = useStore($genderInfo)
  const goToONlySomeFilter = useEvent($goToONlySomeFilter)
  
  const sexLine = useMemo(() => {
    if (genderInfo === null) return ''
    return genderInfo.sexLine ?? ''
  }, [genderInfo])
  
  
  return (
    <div  className={styles.brandsContent}>
      {[].map((item, index) => (
        <Link
          onClick={() => goToONlySomeFilter({ key: 'brands', value: item })}
          key={index} to={`/products/${sexLine}?brands=${item}`} className={styles.brand}>
          {item}
        </Link>
      ))}
      <Link to={'/brands'} className={styles.allBrand}>Показать все бренды</Link>
    </div>
  )
}
