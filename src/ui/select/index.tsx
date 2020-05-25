import React, { FC } from 'react'
import { BlurSelect } from './blur-select'


export type Props = {
  type?: 'blur',
  
  title?: string,
  multi?: boolean,
  search?: boolean,
  
  options?: Array<{ key: string | number, label: string | number }>,
  onSelect?: (keys: Array<string | number>) => void,
  onChange?: (value: string) => void,
}




export const Select: FC<Props> = (props) => (
  <BlurSelect {...props}/>
)

