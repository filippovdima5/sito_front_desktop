import React from 'react'
import { SexId } from '../../types'
import styles from './styles.module.scss'
import { MainBanner } from './organisms'


export function HomePage({ sexId }: { sexId: SexId }) {
  
  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <MainBanner/>
      </div>
    </div>
  )
}
