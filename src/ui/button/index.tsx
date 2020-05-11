import React, { FC } from 'react'
import { BlurButton } from './blur-button'


export type Props = {
  type?: 'blur',
  title?: string,
  onClick?: () => void,
}

export const Button: FC<Props> = (props) => (
  <BlurButton {...props}>
    {props.children}
  </BlurButton>
)




