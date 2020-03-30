import React from 'react'
import { Logo } from '../../commons/atoms/logo'
import styles from './styles.module.scss'


export function FooterTop() {
  return(
    <div className={styles.footerTop}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          
          <Logo color={'white'}/>
  
          <div className={styles.about}>
            <div className={styles.wrapAbout}>
              Сервис сканирует ассортимент десятков магазинов, на данный сайт
              попадают товары со скидкой от 50%. Сейчас мы усиленно работаем над
              улучшением сортировки товаров и увеличением количества магазинов партнеров.
            </div>
          </div>
          
          
        </div>
      </div>
    </div>
  )
}
