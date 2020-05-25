import React, {useMemo, useState} from 'react'
import styled from 'styled-components'
import { Search } from '../../assets/svg'


type Props = {
  type?: HTMLInputElement['type'],
  placeholder?: string,
  search?: boolean,
  value?: string,
  onChange?: (value: string) => void,
  className?: string,
  notBorderRad?: boolean,
}

export function Input(props: Props) {
  const [ inValue, setInValue ] = useState('')
  const [ focus, setFocus ] = useState(false)
  
  
  const currentValue = useMemo(() => {
    if (!props.value) return inValue
    return props.value
  }, [inValue, props.value])
  
  const value = useMemo(() => {
    if (focus) return currentValue
    return currentValue ?? (props.placeholder ?? '')
  }, [ focus, currentValue, props.placeholder ])
  
  return (
    <S.Wrap>
      {props.search && (
        <Search
          className='icon-search'
        />
      )}
      
      <S.Input
        notBorderRad = {props.notBorderRad ?? false}
        className={props.className ?? ''}
        focus={focus}
        search={props.search ?? false}
        type={props.type ?? 'text'}
        placeholder={props.placeholder ?? ''}
        value={value}
        onChange={event => {
          setInValue(event.target.value)
          props.onChange && props.onChange(event.target.value)
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
  
      
    </S.Wrap>
  )
}



const S = {
  Wrap: styled.div`
    width: 100%;
    position: relative;
    
    & .icon-search {
      fill: rgba(0,0,0,0.8);
      position: absolute;
      top: 50%;
      left: 20px;
    }
`,
  
  Input: styled.input<{ search: boolean, focus: boolean, notBorderRad: boolean }>`
    background-color: transparent;
    width: 100%;
    border: 1px solid #CBCBCB;
    box-sizing: border-box;
    border-radius: ${({ notBorderRad }) => notBorderRad ? '0' : '5px'};
    height: 40px;
    padding-left: ${({ search }) => search ? '40px' : '20px'};
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: ${({ focus }) => focus ? '#272727' : 'rgba(39,39,39,0.8)'};
`
}
