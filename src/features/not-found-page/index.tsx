import React  from 'react'
import { Link } from 'react-router-dom'
import t from '../../media/img/svg/telegram.png'
import i from '../../media/img/svg/instagram.svg'
import v from '../../media/img/svg/vk.svg'
import y from '../../media/img/svg/youtube.svg'
import styles from './styles.module.scss'
import imgNot from './404.png'
import {useBodyScrollTop} from '../../helpers/hooks/use-body-scroll-top'



export function NotFound() {
  useBodyScrollTop()
  return (
    <div className={styles.container}>

      <div className={styles.notFound}>
        <div className={styles.wrapImg}>
          <img src={imgNot} alt={'not-found'} className={styles.img}/>
        </div>
      </div>

      <h1 className={styles.h1}>
        Что-то пошло не так! Попробуйте лучше:
      </h1>

      <div className={styles.btns}>
        <Link className={styles.a} to={'/'}>Перейти на главную</Link>
      </div>

      <span className={styles.span}>
        Присоединяйтесь к нам в соц.сети. Мы открыты для общения!
      </span>


      <div className={styles.socials}>
        <div className={styles.socialList}>
          <a className={styles.soc} target={'_blank'} href={'/'} rel="noopener noreferrer" >
            <img className={styles.img} src={t} alt={'d'}/>
          </a>
          <a className={styles.soc} target={'_blank'} href={'/'} rel="noopener noreferrer" >
            <img className={styles.img} src={i} alt={'d'}/>
          </a>
          <a className={styles.soc} target={'_blank'} href={'/'} rel="noopener noreferrer" >
            <img className={styles.img} src={v} alt={'d'}/>
          </a>
          <a className={styles.soc} target={'_blank'} href={'/'} rel="noopener noreferrer" >
            <img className={styles.img} src={y} alt={'d'}/>
          </a>
        </div>
      </div>

    </div>
  )
}