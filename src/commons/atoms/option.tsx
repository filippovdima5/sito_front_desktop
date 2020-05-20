import React from 'react'
import styled from 'styled-components'


type Props = {
  index: string | number,
  label: string,
  checked: boolean,
  
  disable?: boolean,
  onDel?: (key: string | number, label: string) => void,
  onAdd?: (key: string | number, label: string) => void,
  onClick?: () => void,
}

export function Option(props: Props) {
  return (
    <S.Option disabled={props.disable ?? false} checked={props.checked}>
      <S.Label disabled={props.disable ?? false} checked={props.checked}>
        <input
          className='checkbox'
          type='checkbox'
          readOnly
          onClick={() => {
            if (props.checked) {
              props.onDel && props.onDel(props.index, props.label)
              props.onClick && props.onClick()
              return
            }
            if (!props.disable) {
              props.onAdd && props.onAdd(props.index, props.label)
              props.onClick && props.onClick()
            }
          }}
          checked={props.checked}
        />
        <span className='icon'/>
        <span className='text'>{props.label}</span>
      </S.Label>
    </S.Option>
  )
}


const S = {
  Option: styled.li<{ checked: boolean, disabled: boolean }>`
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    cursor: pointer;
    margin: 8px 0;
    color: #272727;
    width: 100%;
    
    opacity: ${({ disabled }) => disabled ? '0.5' : '1'};
    
    &:nth-child(1) { margin: 0 0 8px 0 }
    &:nth-last-child(1){ margin: 8px 0 0 }
`,
  
  Label: styled.label<{ checked: boolean, disabled: boolean }>`
      position: relative;
      display: inline-flex;
      width: 100%;
      align-items: center;
      text-align: left;
      cursor: ${({ disabled, checked }) => ((disabled && checked) || !disabled) ? 'pointer' : 'default'};
      
      
     & .checkbox {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      visibility: hidden;
    }
  
    & .icon {
        display: block;
        -ms-flex: 0 0 19px;
        flex: 0 0 19px;
        width: 19px;
        height: 19px;
        position: relative;
        border: 2px solid #E7E7E7;
    }
    
    & .icon:after {
        content: '';
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        background-image: url('/assets/check.svg');
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -7px;
        margin-left: -7px;
        width: 15px;
        height: 12px;
        opacity: ${({ checked }) => checked ? '1' : '0'};
      }
      
      & .text {
        display: block;
        margin-left: 15px;
        opacity: ${({ checked }) => checked ? '0.9' : '0.7'};
        font-weight:  ${({ checked }) => checked ? 'bold' : 'normal'};
      }
`
}
