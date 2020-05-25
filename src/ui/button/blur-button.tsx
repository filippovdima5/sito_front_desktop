import React, {useState, FC, useEffect} from 'react'
import styled from 'styled-components'
import { Props } from './index'


export const BlurButton: FC<Props> = (props) => {
  const [ active, setActive ] = useState(Boolean(props.active))
  
  useEffect(() => {
    setActive(Boolean(props.active))
  }, [props.active])
  
  return (
    <S.Button
      className = {props.className}
      activeClick={active}
      onClick={() => {
        if (props.onClick) props.onClick()
        setActive(!active)
      }}
      { ...props.onClick && { onClick: props.onClick } }
    >
      { props.title ?? props.children }
    </S.Button>
  )
}


const S = {
  Button: styled.button<{ activeClick: boolean }>`
    background-color: ${({ activeClick }) => activeClick ? '#FFFFFF' : 'rgba(5,9,18,0.5)'};
    color: ${({ activeClick }) => activeClick ? 'rgba(39,39,39,0.8)' : 'rgba(255,255,255,0.8)'};
    
    text-transform: uppercase;
    padding: 11px 40px 10px;
    font-size: 14px;
    line-height: 16px;
    border-radius: 5px;
    
    margin: 0 5px;
    
    box-sizing: border-box;
    width: 172px;
    height: 40px;
    
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`
}






