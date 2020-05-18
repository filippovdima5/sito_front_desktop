import React, { useMemo } from 'react'
import { Link , useLocation } from 'react-router-dom'
import { useEvent } from 'effector-react/ssr'
import { namesCategory } from '../../../../constants/category-keys'
import { categoriesGroupBySub } from '../../../../constants/categories-group-by-sub'
import { $mountProductsPage } from '../../../products-page/new-store'
import { findSexInPath, sexIdToStr } from '../../../../lib'
import styles from './styles.module.scss'


const subCategories = [
  ['clothes', 'Одежда'],
  ['shoes', ' Обувь'],
  ['accessories', 'Аксессуары']
] as Array<[keyof typeof categoriesGroupBySub['1' | '2'], 'Одежда' | 'Обувь' | 'Аксессуары']>


export function CategoriesContent({ sexId }: { sexId: 1 | 2 }) {
  const { pathname } = useLocation()
  const mountProductsPage = useEvent($mountProductsPage)
  const pathSex = useMemo(() => findSexInPath(pathname), [pathname])
  const lineSex = useMemo(() => sexIdToStr(sexId), [sexId])
  
  
  return (
    <div className={styles.categoriesContent}>
      {subCategories.map(([ subKey, subName ]) => (
        <div key={`${subKey}_${sexId}`}  className={styles.subcategoryGroupBox}>
          <span className={styles.titleSubcategory}>{subName}</span>
          <div className={styles.subContentBox}>
            <ul className={styles.subContent}>
              {categoriesGroupBySub[sexId][subKey].map((categoryId) => (
                <li key={`${categoryId}_${sexId}`} className={styles.liLink}>
                  <Link
                    onClick={() => {
                      if (pathSex === lineSex) mountProductsPage({ pathname: `/${lineSex}/products`, search: `?categories=${categoryId}` })
                    }}
                    className={styles.categoryLink}
                    to={`/${lineSex}/products?categories=${categoryId}`}
                  >
                    {namesCategory[sexId][categoryId]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

