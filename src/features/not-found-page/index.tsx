import React, { useMemo } from 'react'
import { useLocation } from 'react-router'
import { useBodyScrollTop } from '../../hooks/use-body-scroll-top'
import { Button1 } from '../../commons/atoms'
import styles from './styles.module.scss'


export function NotFoundPage() {
  useBodyScrollTop()
  
  const { pathname } = useLocation()
  
  const sex = useMemo(() => {
    if (!pathname.includes('/men')) return null
    if (pathname.includes('/women')) return 'women'
    return 'men'
  }, [pathname])
  
  
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
        <Button1 href={sex === null ? '/' : `/${sex}/home`} className={styles.button}>Перейти на главную</Button1>
        
        {sex !== null && (
          <Button1 href={`/${sex}/products`} className={styles.button}>Перейти в каталог товаров</Button1>
        )}
      </div>

      <div className={styles.span}>
        Присоединяйтесь к нам в соц.сети. Мы открыты для общения!
      </div>
    </div>
  )
}
