import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'


const data = [
  { index: 'women', title: 'Для женщин', url: '/women/home' },
  { index: 'men', title: 'Для мужчин', url: '/men/home' },
] as const


export function GenderDetected() {
  
  return (
    <div className={styles.main}>
      <div className={styles.wrap}>
        {data.map(({ index, title, url }) => (
          <Link
            to={url}
            key={index}
            className={styles.genderWrap}
          >
            <div className={styles.gender}>
              <img
                src={`/assets/gender-${index}.jpg`}
                alt={title} className={styles.img}
              />

              <div className={styles.titleWrap}>
                <div className={styles.title}>{title}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

