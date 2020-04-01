import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useEvent } from 'effector-react/ssr'
import { $goToONlySomeFilter } from '../../../products-page/store'
import { namesCategory } from '../../../../constants/category-keys'
import { categoriesGroupBySub } from '../../../../constants/categories-group-by-sub'
import { sexIdToStr } from '../../../../helpers/lib'
import styles from './styles.module.scss'


const subCategories = [
  ['clothes', 'Одежда'],
  ['shoes', ' Обувь'],
  ['accessories', 'Аксессуары']
] as Array<[keyof typeof categoriesGroupBySub['1' | '2'], 'Одежда' | 'Обувь' | 'Аксессуары']>


export function CategoriesContent({ sexId }: { sexId: 1 | 2 }) {
  const goToONlySomeFilter = useEvent($goToONlySomeFilter)
  const sexLine = useMemo(() => sexIdToStr(sexId), [sexId])
  
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
                    onClick={() => goToONlySomeFilter({ key: 'categories', value: categoryId })}
                    className={styles.categoryLink}
                    to={`/products/${sexLine}?categories=${categoryId}`}
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

