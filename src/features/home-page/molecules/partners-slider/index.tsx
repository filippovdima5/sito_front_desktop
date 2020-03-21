import React from 'react'
import styles from './styles.module.scss'


// todo: Буду вызывать через api, из коллекции магазинов, одбирая тех с кем есть партнерка
const data: any = []
for (let i = 0; i < 20; i++){
  data.push(`/${i}`)
}

export function PartnersSlider() {
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.preWrap}>
      
          {data.map((i: string) => (
            <div className={styles.item} key={i}>
              <img  className = {styles.img} alt={''} src={i}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
