import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useEffectSafe } from '../../helpers/hooks/use-effect-safe'
import { Props } from './index'



export const BlurSelect: FC<Props> = (props) => {
  const [ active, setActive ] = useState(false)
  const [ isEmpty, setIsEmpty ] = useState(true)
  const [ selectedKeys, setSelectedKeys ] = useState<Array<string>>([])
  const [ selectedValues, setSelectedValues ] = useState<string>('')
  
  useEffect(() => {
    if (selectedKeys.length === 0) setIsEmpty(true)
    else setIsEmpty(false)
  }, [ selectedKeys ])
  
  
  useEffectSafe(() => {
    if (props.options) {
      const values = props.options
        .filter(item => selectedKeys.includes(item.key))
        .map(item => item.value)
        .join(', ')
  
      setSelectedValues(values)
    }
  }, [ selectedKeys ])
  
  
  const handleOk = () => {
    if (active) {
      props.onSelect && props.onSelect(selectedKeys)
      setActive(false)
    } else {
      setActive(true)
    }
  }
  
  return (
    <S.Wrap>
      <S.Select
        onClick={() => handleOk()}
        activeClick={active}
      >
        { isEmpty ? props.title : selectedValues }
      </S.Select>
      
      {
        active && (
          <div>
            {/*<div onClick={() => setSelectedKeys('ddd')}>fewfw</div>*/}
            
          </div>
        )
      }
    </S.Wrap>
  )
}

type PropsSelect = {
  activeClick: boolean,
}

const S = {
  Wrap: styled.div`
    position: relative;
`,
  
  Select: styled.div<PropsSelect>`
    cursor: pointer;
    padding: 11px 55px 10px 40px;
    text-transform: uppercase;
    font-size: 14px;
    line-height: 16px;
    border-radius: 5px;
    margin: 0 5px;
    
    background-color: ${({ activeClick }) => activeClick ? '#FFFFFF' : 'rgba(5,9,18,0.5)'};
    color: ${({ activeClick }) => activeClick ? 'rgba(39,39,39,0.8)' : 'rgba(255,255,255,0.8)'};
     
`
  
}
