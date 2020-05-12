import React, { FC } from 'react'
import styled from 'styled-components'
import { Props } from './index'




export const BlackButton: FC<Props> = (props) => {
  return (
    <S.Small
      onClick={() => {
        props.onClick && props.onClick()
      }}
      className={props.className}
      style={props.style ?? {}}
    >
      { props.title ?? props.children }
    </S.Small>
  )
}


const S = {
  Small: styled.button`
    background: #272727;
    width: 218px;
    height: 52px;
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    padding: 15px 30px 16px;
    color: #FFFFFF;
`
}
