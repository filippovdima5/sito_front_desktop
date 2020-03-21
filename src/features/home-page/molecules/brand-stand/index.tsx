import React from 'react'
import { Link } from 'react-router-dom'
import { Title } from '../../atoms/title'
import styles from './styles.module.scss'


type Props = {
  height: number,
  img: string,
  title: string,
  url: string,
}

export function BrandStand({ title, height, img, url }: Props) {
  
  return (
    <div className={styles.wrap}>
      <div style={{ paddingTop: `${height}%` }} className={styles.container}>
        <img className={styles.img} src={img} alt={title}/>
        <div className={styles.title}>
          <Title title={title}/>
        </div>
        <Link className={styles.link} to={url}/>
      </div>
    </div>
  )
}
