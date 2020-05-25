import React from 'react'
import styled from 'styled-components'


type Props = {
  className?: string,
  style?: React.CSSProperties,
}

export function Skeleton({ className, style }: Props) {
  return (
    <S.Skeleton
      {...!!style && { style: style }}
      className={`${className ?? ''}`}
    />
  )
}


const S = {
  Skeleton: styled.div`
  display: inline-block;
  height: 100%;
  width: 100%;
  background: linear-gradient(-90deg, rgba(0, 0, 0, .1) 0%, rgba(0, 0, 0, .2) 50%, rgba(0, 0, 0, .1) 100%);
  background-size: 400% 400%;
  animation: pulse 1.2s ease-in-out infinite;
  @keyframes pulse {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -135% 0%;
    }
  }
`
}

