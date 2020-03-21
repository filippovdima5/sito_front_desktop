import React from 'react'
import { useStore, useEvent } from 'effector-react/ssr'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { $setMenuActive, $showMenu, $menuContent, $setShowMenu } from '../store'
import { useTransitionNames } from '../../../helpers/hooks/use-transition-names'
import { BrandsContent } from '../molecules/brands-content'
import { CategoriesContent } from '../molecules/categories-content'
import styles from './styles.module.scss'


function MenuContent() {
  const menuContent = useStore($menuContent)
  
  if (menuContent === null) return null
  
  switch (menuContent) {
    case 'BRANDS': return <BrandsContent/>
    case 'MEN_CATEGORIES': return <CategoriesContent sexId={1}/>
    case 'WOMEN_CATEGORIES': return <CategoriesContent sexId={2}/>
  }
}


function HiddenNavigation() {
  const setMenuActive = useEvent($setMenuActive)
  const setShowMenu = useEvent($setShowMenu)
  
  return (
    <div onClick={() => setShowMenu(false)} className={styles.template}>
      <div
        onMouseOver={() => setMenuActive(true)}
        onMouseOut={() => setMenuActive(false)}
        className={styles.container}
      >
        <MenuContent/>
      </div>
    </div>
  )
}



function ShowAnimate() {
  const showMenu = useStore($showMenu)
  const classNames = useTransitionNames(styles)
  
  return (
    <TransitionGroup>
      {showMenu && (
        <CSSTransition
          timeout={200}
          classNames={classNames}
        >
          <HiddenNavigation/>
        </CSSTransition>
      )}
    </TransitionGroup>
  )
}

export { ShowAnimate as HiddenNavigation }
