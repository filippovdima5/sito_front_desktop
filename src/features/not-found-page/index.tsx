import React  from 'react'
import { Link } from 'react-router-dom'
import t from '../../assets/img/svg/telegram.png'
import i from '../../assets/img/svg/instagram.svg'
import v from '../../assets/img/svg/vk.svg'
import y from '../../assets/img/svg/youtube.svg'
import { useBodyScrollTop } from '../../hooks/use-body-scroll-top'
import styles from './styles.module.scss'
import imgNot from './404.png'



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
