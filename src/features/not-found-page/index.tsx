import React  from 'react'
import { useBodyScrollTop } from '../../hooks/use-body-scroll-top'
import { Button } from '../../ui/button'
import styles from './styles.module.scss'


export function NotFound() {
  useBodyScrollTop()
  return (
    <div className={styles.container}>

      <div className={styles.notFound}>
        <div className={styles.wrapImg}>
          <img src='/assets/404.svg' alt={'not-found'} className={styles.img}/>
        </div>
      </div>

      <h1 className={styles.h1}>
        Что-то пошло не так! Попробуйте лучше:
      </h1>

      <div className={styles.buttons}>
        <Button className={styles.button} type={'black'} title={'Перейти на главную'}/>
        <Button className={styles.button} type={'black'} title={'Перейти в каталог товаров'}/>
      </div>

      <div className={styles.span}>
        Присоединяйтесь к нам в соц.сети. Мы открыты для общения!
      </div>
    </div>
  )
}
