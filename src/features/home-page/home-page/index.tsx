import React from 'react'
import { sexIdToStr } from '../../../helpers/lib'

import { CategoryStand } from '../molecules/category-stand'
import { PartnersSlider } from '../molecules/partners-slider'
import { BrandStand } from '../molecules/brand-stand'

import styles from './styles.module.scss'


type Props = {
  sexId: 1 | 2,
}

export function HomePage({ sexId }: Props) {
  
  return (
    <div className={styles.home}>
      <div className={styles.wrap}>
        
        <div className={styles.row}>
          <CategoryStand
            height={52}
            sexId={sexId}
            index={0}
          />
  
          <CategoryStand
            height={52}
            sexId={sexId}
            index={1}
          />
        </div>
  
        
        <BrandStand
          height={22}
          title={'Бренды'}
          img={'/cdn/mobile/home/brands/nike.jpg'}
          url={`/brands/${sexIdToStr(sexId)}`}
        />
  
        <div className={styles.row}>
          <CategoryStand
            height={52}
            sexId={sexId}
            index={2}
          />
    
          <CategoryStand
            height={52}
            sexId={sexId}
            index={0}
          />
        </div>
  
        <PartnersSlider/>
        
      </div>
    </div>
  )
}
