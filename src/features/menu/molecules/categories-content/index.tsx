import React from 'react'
import { Link } from 'react-router-dom'
import { namesCategory } from '../../../../constants/category-keys'
import { categoriesGroupBySub } from '../../../../constants/categories-group-by-sub'
import styles from './styles.module.scss'


const subCategories = [
  ['clothes', 'Одежда'],
  ['shoes', ' Обувь'],
  ['accessories', 'Аксессуары']
] as Array<[keyof typeof categoriesGroupBySub['1' | '2'], 'Одежда' | 'Обувь' | 'Аксессуары']>


export function CategoriesContent({ sexId }: { sexId: 1 | 2 }) {
  return (
    <div className={styles.categoriesContent}>
      
      {subCategories.map(([ subKey, subName ]) => (
        <div className={styles.subcategoryGroup}>
          <span className={styles.titleSubcategory}>{subName}</span>
          <div className={styles.subContent}>
            {categoriesGroupBySub[sexId][subKey].map((categoryId) => (
              <Link className={styles.categoryLink} key={categoryId} to={'/'}>{namesCategory[sexId][categoryId]}</Link>
            ))}
          </div>
        </div>
      ))}
      

      
    </div>
  )
}

