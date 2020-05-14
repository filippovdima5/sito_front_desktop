import React, { FC, useEffect, useRef, useState, useMemo } from 'react'
import styled from 'styled-components'
import { useEffectSafe } from '../../helpers/hooks/use-effect-safe'
import {Arrow, Search} from '../../assets/svg'
import { Props } from './index'



function SelectLabel({ active, labels, handleOk, isEmpty, title }:
{ active: boolean, labels: string, isEmpty: boolean, title?: string, handleOk: () => void }) {
  return (
    <S.Select onClick={() => handleOk()} active={active}>
      <span className='select-label'>{ isEmpty ? title : labels }</span>
    </S.Select>
  )
}


function SelectSearch({ handleOk, title, onChange, labels }:
{ title?: string, handleOk?: () => void, onChange?: (value: string) => void, labels: string }) {
  
  const placeholderRef = useRef(title)
  const [ focus, setFocus ] = useState(false)
  const [ value, setValue ] = useState('')
  
  const placeholder = useMemo(() => {
    if (focus) return value
    if (!focus) {
      if (labels) return labels
      if (!value) return placeholderRef.current
      return value
    }
  }, [focus, value, labels])
  
  
  return (
    <S.Search onClick={() => {
      handleOk && handleOk()
    }}>
      <Search className='search-icon'/>
      
      <input
        onChange={event => {
          onChange && onChange(event.target.value)
          setValue(event.target.value)
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={placeholder}
        className='input'
        type='text'
        autoComplete='off'
      />
    </S.Search>
  )
}



export const BlurSelect: FC<Props> = (props) => {
  const [ active, setActive ] = useState(false)
  const [ selectedKeys, setSelectedKeys ] = useState<Array<string | number>>([])
  
  const [ isEmpty, setIsEmpty ] = useState(true)
  const [ labels, setLabels ] = useState<string>('')
  
  
  
  useEffect(() => {
    if (selectedKeys.length === 0) setIsEmpty(true)
    else setIsEmpty(false)
  }, [ selectedKeys ])
  
  
  useEffectSafe(() => {
    if (props.options) {
      const labels = props.options
        .filter(item => selectedKeys.includes(item.key))
        .map(item => item.label)
        .join(', ')
  
      setLabels(labels)
    }
  }, [ selectedKeys ])
  
  
  const handleOk = () => {
    if (active && props.onSelect) props.onSelect(selectedKeys)
    setActive(!active)
  }
  
  const handleSelectOption = (key: string | number) => {
    let newSelectedKeys: Array<string | number>
    
    if (!selectedKeys.includes(key)) newSelectedKeys = [...selectedKeys, key]
    else newSelectedKeys = selectedKeys.filter(item => item !== key)
    
    setSelectedKeys(newSelectedKeys)
    props.onSelect && props.onSelect(newSelectedKeys)
    
    if (!props.multi) handleOk()
  }
  
  return (
    <S.Wrap active={active}>
      
      { props.search ?
        <SelectSearch {...{ handleOk, title: props.title, labels } }/>
        :
        <>
          <SelectLabel { ...{ isEmpty, handleOk, labels, active, title: props.title } }/>
          <Arrow
            //color={active ? 'rgba(39,39,39,0.8)' : 'white'}
            rotate={active ? 180 : 0}
            className={'arrow'}
          />
        </>
      }
      
      { active && props.options && props.options.length !== 0 &&
        <S.OptionContainer>
          <ul className='inner'>
            { props.options.map(option => (
              <S.Option
                activeOption = {selectedKeys.includes(option.key)}
                key={option.key}>
                <label className='option-label'>
                  <input
                    className='checkbox'
                    type='checkbox'
                    onClick={() => handleSelectOption(option.key)}
                    readOnly
                    checked={ selectedKeys.includes(option.key) }
                  />
                  <span className='icon'/>
                  <span className='text'> {option.label} </span>
                </label>
              </S.Option>
            )) }
          </ul>
        </S.OptionContainer>
      }
    </S.Wrap>
  )
}

type PropsSelect = {
  active?: boolean,
  activeOption?: boolean,
  focusInput?: boolean,
}

const S = {
  Wrap: styled.div<PropsSelect>`
    position: relative;
    
    & .arrow {
      position: absolute;
      right: 20px;
      top: 50%;
    }
`,
  
  Select: styled.div<PropsSelect>`
    cursor: pointer;
    padding: 13px 50px 10px 20px;
    text-transform: uppercase;
    font-size: 14px;
    line-height: 16px;
    border-radius: 5px;
    
    margin: 0 5px;
    
    box-sizing: border-box;
    width: 216px;
    height: 40px;
    
    background-color: ${({ active }) => active ? '#FFFFFF' : 'rgba(5,9,18,0.5)'};
    color: ${({ active }) => active ? 'rgba(39,39,39,0.8)' : 'rgba(255,255,255,0.8)'};
    
    & .select-label {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
`,
  
  Search: styled.div<PropsSelect>`
    padding: 8px 20px 10px 50px;
    
    position: relative;
    margin: 0 5px;
    box-sizing: border-box;
    width: 216px;
    height: 40px;
    border-radius: 5px;
    background-color: rgba(5,9,18,0.5);
   
   
   & .search-icon {
      position: absolute;
      left: 20px;
      top: 50%;
   };
    
    & .input {
      background-color: transparent;
      width: 100%;
      font-size: 14px;
      line-height: 16px;
      text-transform: uppercase;
      
      color: ${({ focusInput }) => focusInput ? 'rgba(39,39,39,0.8)' : 'rgba(255,255,255,0.5)'};
    }
    
    & .input {
    
    }
`,
  
  OptionContainer: styled.div`
    width: 265px;
    background-color: white;
    position: absolute;
    top: calc(100% + 10px);
    border-radius: 5px;
    left: 5px;
    padding: 12px 10px;
    
    & .inner{
       overflow-y: auto;
       overflow-x: hidden;
       max-height: 241px;
    }
    
    & .inner::-webkit-scrollbar{ width: 6px };
    & .inner::-webkit-scrollbar-track {
      width: 6px;
      background-color: #E7E7E7
    };
    & .inner::-webkit-scrollbar-thumb{
      width: 6px;
      background-color: #CFD0D2;
    }
`,
  
  Option: styled.li<PropsSelect>`
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    cursor: pointer;
    margin: 8px 0;
    color: #272727;
    width: 100%;
    
    &:nth-child(1) {
      margin: 0 0 8px 0;
    }
    &:nth-last-child(1){
      margin: 8px 0 0;
    }
    
    & .option-label {
      position: relative;
      display: inline-flex;
      width: 100%;
      align-items: center;
      text-align: left;
      cursor: pointer;
    };
    
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
        opacity: ${({ activeOption }) => activeOption ? '1' : '0'};
      }
      
      & .text {
        display: block;
        margin-left: 15px;
        opacity: ${({ activeOption }) => activeOption ? '0.8' : '0.3'};
        font-weight:  ${({ activeOption }) => activeOption ? 'bold' : 'normal'};
      }
`
}
