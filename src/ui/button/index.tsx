import React, { FC } from 'react'
import { BlurButton } from './blur-button'
import { BlackButton } from './black-button'


export type Props = {
  type?: 'blur' | 'black',
  title?: string,
  onClick?: () => void,
  active?: boolean,
  size?: 'small' | 'middle' | 'large',
  style?: React.CSSProperties,
  className?: string,
}

export const Button: FC<Props> = (props) => {
  if (props.type === 'black') return (
    <BlackButton {...props}>
      {props.children}
    </BlackButton>
  )
  
  return (
    <BlurButton {...props}>
      {props.children}
    </BlurButton>
  )
}




