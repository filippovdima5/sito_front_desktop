import React from 'react'
import { Skeleton } from '../../atoms/skeleton/skeleton'
import styles from './styles.module.scss'



export function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div>

        <div className={styles.wrapImg}>
          <span>
            <Skeleton  customStyle={{ paddingBottom: 'calc(125% + 30px)' }}/>
          </span>
        </div>

        <div className={styles.footer}>
          <div className={styles.brand}>
            <Skeleton customStyle={{ height: 14 }}/>
          </div>

          <div className={styles.title}>
            <Skeleton customStyle={{ height: 14 }}/>
          </div>

          <div className={styles.cost}>
            <del className={styles.old_price}>
              <Skeleton customStyle={{ height: 14, width: 40 }}/>
            </del>
            <span className={styles.price}>
              <Skeleton customStyle={{ height: 14, width: 40 }}/>
            </span>
          </div>

          <div className={styles.sale}/>
        </div>

      </div>
    </div>
  )
}
