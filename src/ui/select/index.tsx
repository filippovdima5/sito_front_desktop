import React, { FC } from 'react'
import { BlurSelect } from './blur-select'


export type Props = {
  title: string,
  
  options?: Array<{ key: string, value: string }>,
  onSelect?: (keys: Array<string>) => void,
  type?: 'blur',
  multi?: boolean,
}

export const Select: FC<Props> = (props) => (
  <BlurSelect {...props}/>
)

