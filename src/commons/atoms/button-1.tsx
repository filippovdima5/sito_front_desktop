import React, { FC, useMemo } from 'react'
import styled from 'styled-components'


type Props = {
  icon?: { icon: FC<{ className: string }>, pos: 'left' | 'right' },
  onClick?: () => void,
  className?: string,
}


export const Button1: FC<Props> = (props) => {
  const posIcon = useMemo(() => {
    if (!props.icon) return null
    return props.icon.pos
  }, [props.icon])
  
  return (
    <S.Button
      className={props.className ?? ''}
      icon={!!props.icon}
      posIcon={posIcon}
      onClick={() => {
        props.onClick && props.onClick()
      }}
    >
      {props.icon && <props.icon.icon className='icon-button-1'/>}
      {props.children}
    </S.Button>
  )
}


const S = {
  Button: styled.button<{ posIcon: null | 'right' | 'left', icon: boolean }>`
    position: relative;
    height: 40px;
    color: rgba(39,39,39,0.8);
    font-size: 16px;
    line-height: 19px;
    background-color: rgba(230,230,230,0.1);
    border: 1px solid #CBCBCB;
    box-sizing: border-box;
    padding: ${({ posIcon }) => !posIcon ? '0 20px' : (posIcon === 'left' ? '0 20px 0 40px' : '0 40px 0 20px')};
    
    & .icon-button-1 {
      fill: rgba(39,39,39,0.8);
      top: 50%;
      left: ${({ posIcon }) => !posIcon ? '20px' : (posIcon === 'left' ? '20px' : 'calc(100% - 20px)')};
    }
    
    &:hover {
      background-color: rgba(230,230,230,0.5);
    }
`
}
