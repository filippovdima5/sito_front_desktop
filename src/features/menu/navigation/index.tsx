import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from 'effector-react/ssr'
import { $genderInfo } from '../../../stores/user'
import { $baseRoute } from '../../../stores/env'
import styles from './styles.module.scss'

//  ? true : (baseRoute !== 'products' && baseRoute !=='brands' && sexId === 2)

function ActiveBorder({ active }: { active: boolean }) {
  if (!active) return null
  return (<div className={styles.activeBorder}/>)
}

export function Navigation() {
  const genderInfo = useStore($genderInfo)
  const baseRoute = useStore($baseRoute)
  const sexId = useMemo(() => {
    if (genderInfo === null) return null
    return genderInfo.sexId
  }, [genderInfo])
  
  return (
    <ul className={styles.navigation}>
      <li className={styles.navItem}>
        <Link
          to={'/brands'}
          className={styles.navLink}
        >
          Бренды
        </Link>
        
        <ActiveBorder active={baseRoute === 'brands'}/>
      </li>
  
  
      <li className={styles.navItem}>
        <Link
          //onClick = {handleSetSex}
          to={'/products/men'}
          className={styles.navLink}
        >
            Мужское
        </Link>
  
        <ActiveBorder
          active={((baseRoute === 'products') && (sexId === 1))}/>
      </li>
        
        
      <li className={styles.navItem}>
        <Link
          // onClick = {handleSetSex}
          to={'/products/women'}
          className={styles.navLink}
        >
            Женское
        </Link>
  
        <ActiveBorder
          active={((baseRoute === 'products') && (sexId === 2))}/>
      </li>
      
    </ul>
  )
}
