import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { Arrow } from '../../../assets/svg'
import { categoryKeys } from '../../../constants'
import { SexId } from '../../../types'
import { Option } from '../../../commons/atoms'



type Props = {
  sexId: SexId,
  categories: Array<number>,
  setCategory: (cat: Array<number>) => void,
}


export function SelectCategory({ categories, sexId, setCategory }: Props) {
  const [ opened, setOpen ] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)
  
  const label = useMemo(() => categories.map(item => (
    categoryKeys[sexId][item as keyof typeof categoryKeys[1 | 2]]
  )).join(', '), [categories, sexId])
  
  
  const handleClickOut = useCallback((event) => {
    if (selectRef.current) {
      if (!selectRef.current.contains(event.target)) setOpen(false)
    }
  }, [])
  
  useEffect(() => {
    document.addEventListener('click', handleClickOut)
    return () => { document.removeEventListener('click', handleClickOut) }
  }, [handleClickOut])
  
  
  const fontSize = useMemo(() => {
    if (categories.length === 1) return 12
    if (categories.length > 1) return 10
    return 14
  }, [categories])
  
  return (
    <S.Wrap ref={selectRef}>
      <S.Select
        fontSize = {fontSize}
        active={opened || categories.length > 0}
        onClick = {() => setOpen(!opened)}
      >
        <span className='select-label'>
          {categories.length > 0 ? label : 'Все категории'}
        </span>
      </S.Select>
      
      <Arrow
        rotate={opened ? 180 : 0}
        className='arrow'
      />
      
      { opened && (
        <S.OptionContainer>
          <ul className='inner'>
            { Object.entries(categoryKeys[sexId]).map(([key, value]) => (
              <Option
                onAdd={() => setCategory([...categories, Number(key)])}
                onDel={() => setCategory(categories.filter(item => item !== Number(key)))}
                key={key}
                index={key}
                label={value}
                checked={categories.includes(Number(key))}
              />
            )) }
          </ul>
        </S.OptionContainer>
      ) }
    </S.Wrap>
  )
}

const S = {
  Wrap: styled.div`
    position: relative;
    
    & .arrow {
      position: absolute;
      right: 20px;
      top: 50%;
    }
`,
  
  Select: styled.div<{active: boolean, fontSize: number}>`
    font-size: ${({ fontSize }) => `${fontSize}px`};
    background-color: ${({ active }) => active ? '#FFFFFF' : 'rgba(5,9,18,0.5)'};
    color: ${({ active }) => active ? 'rgba(39,39,39,0.8)' : 'rgba(255,255,255,0.8)'};

    cursor: pointer;
    padding: 13px 50px 10px 20px;
    text-transform: uppercase;
    line-height: 16px;
    border-radius: 5px;
    
    margin: 0 5px;
    
    box-sizing: border-box;
    width: 216px;
    height: 40px;
    
    

    

    
    & .select-label {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
`,
  
  OptionContainer: styled.div`
    width: 265px;
    background-color: white;
    position: absolute;
    top: calc(100% + 10px);
    border-radius: 5px;
    left: 5px;
    z-index: 2;
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
}


