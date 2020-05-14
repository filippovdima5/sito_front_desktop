import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useTransitionNames } from '../../../../../../hooks/use-transition-names'
import styles from './styles.module.scss'



type Props = {
  title: string,
  onClick: () => void,
  visible?: boolean,
}




function BtnHelp(props: Props) {
  if (props.visible === false) return null
  return (
    <div className={styles.wrapBtn}>
      <button onClick={props.onClick} className={styles.btn}>
        <span className={styles.title}>
          {props.title}
        </span>
      </button>
    </div>
  )
}


function ShowBtn(props: Props) {
  const classNames = useTransitionNames(styles)
  if (props.visible === undefined) return <BtnHelp {...props}/>
  
  return (
    <TransitionGroup>
      {props.visible && (
        <CSSTransition
          timeout={100}
          classNames={classNames}
        >
          <BtnHelp {...props}/>
        </CSSTransition>
      )}
    </TransitionGroup>
  )
}


export { ShowBtn as BtnHelp }
