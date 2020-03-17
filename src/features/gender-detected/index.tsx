import React from 'react'
import { Link } from 'react-router-dom'
import { useStore, useEvent } from 'effector-react/ssr'
import { sexIdToStr } from '../../helpers/lib'

import { $setGender } from '../../stores/user'
import { $baseLink } from '../../stores/env'


import styles from './styles.module.scss'


const data = [
  { index: 2, title: 'Для женщин' },
  { index: 1, title: 'Для мужчин' },
] as const


type Props = {
  height: number,
}


export function GenderDetected({ height }: Props) {
  const {  linkParams: { baseRoute, search } } = useStore($baseLink)
  const setGender = useEvent($setGender)
  
  
  return (
    <div className={styles.main}>
      <div className={styles.wrap}>
        {data.map(({ index, title }) => (
          <Link
            onClick={() => setGender(index)}
            to={`/${baseRoute}/${sexIdToStr(index)}${search ? `?${search}` : ''}`}
            key={index}
            className={styles.genderWrap}
          >
            <div style={{ paddingTop: `${height}%` }} className={styles.gender}>
              <img src={`/cdn/mobile/gender-detected/${index}.jpg`} alt={title} className={styles.img}/>

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

