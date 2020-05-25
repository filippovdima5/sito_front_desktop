import React, { FC, useMemo } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


type Props = {
  type?: 'small' | 'middle' | 'large',
  icon?: { icon: FC<{ className: string }>, pos: 'left' | 'right' },
  onClick?: () => void,
  className?: string,
  borderRad?: number,
  href?: string | null,
  target?: string,
}


export const Button1: FC<Props> = (props) => {
  const posIcon = useMemo(() => {
    if (!props.icon) return null
    return props.icon.pos
  }, [props.icon])
  
  const height = useMemo(() => {
    switch (props.type) {
      case 'small': return 30
      case 'middle': return 40
      case 'large': return 50
      default: return 40
    }
  }, [props.type])
  
  if (props.href) return (
    <S.Link
      height={height}
      to={props.href}
      target={props.target}
      borderRad={props.borderRad}
      className={props.className ?? ''}
      icon={!!props.icon}
      posIcon={posIcon}
      onClick={() => {
        props.onClick && props.onClick()
      }}
    >
      {props.icon && <props.icon.icon className='icon-button-1'/>}
      {props.children}
    </S.Link>
  )

  return (
    <S.Button
      borderRad={props.borderRad}
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
  Button: styled.button<{ posIcon: null | 'right' | 'left', icon: boolean, borderRad?: number }>`
    position: relative;
    height: 40px;
    color: rgba(39,39,39,0.8);
    font-size: 16px;
    line-height: 19px;
    background-color: rgba(230,230,230,0.1);
    border: 1px solid #CBCBCB;
    box-sizing: border-box;
    padding: ${({ posIcon }) => !posIcon ? '0 20px' : (posIcon === 'left' ? '0 20px 0 40px' : '0 40px 0 20px')};
    border-radius: ${({ borderRad }) => borderRad ? `${borderRad}px` : '0px'};
    
    & .icon-button-1 {
      fill: rgba(39,39,39,0.8);
      top: 50%;
      left: ${({ posIcon }) => !posIcon ? '20px' : (posIcon === 'left' ? '20px' : 'calc(100% - 20px)')};
    }
    
    &:hover {
      background-color: rgba(230,230,230,0.5);
    }
`,
  
  Link: styled(Link)<{ posIcon: null | 'right' | 'left', icon: boolean, borderRad?: number, height: number }>`
    display: flex;
    align-items: center;
    justify-content: center;

    height: ${({ height }) => `${height}px`};

    position: relative;
    color: rgba(39,39,39,0.8);
    font-size: 16px;
    line-height: 19px;
    background-color: rgba(230,230,230,0.1);
    border: 1px solid #CBCBCB;
    box-sizing: border-box;
    padding: ${({ posIcon }) => !posIcon ? '0 20px' : (posIcon === 'left' ? '0 20px 0 40px' : '0 40px 0 20px')};
    border-radius: ${({ borderRad }) => borderRad ? `${borderRad}px` : '0px'};
    
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
