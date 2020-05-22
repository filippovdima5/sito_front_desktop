import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useStore, useEvent } from 'effector-react/ssr'
import { Input, Option } from '../../../commons/atoms'
import { SexId } from '../../../types'
import { $brands, $setSearchBrands, $loadingBrands, $stateOfLoadBrands } from '../store'
import { Loader } from '../../../commons/templates/loader'


type Props = {
  sexId: SexId,
  categories: Array<number>,
  selectedBrands: Array<string>,
  setBrands: (arr: Array<string>) => void,
}


export function SearchBrands({ categories, sexId, selectedBrands, setBrands }: Props) {
  const [ opened, setOpen ] = useState(false)
  
  const selectRef = useRef<HTMLDivElement>(null)
  
  const brands = useStore($brands)
  const stateOfLoadBrands = useStore($stateOfLoadBrands)
  const loader = useStore($loadingBrands)
  const setSearchBrands = useEvent($setSearchBrands)
  
  const handleClickOut = useCallback((event) => {
    if (selectRef.current) {
      if (!selectRef.current.contains(event.target)) setOpen(false)
    }
  }, [])
  
  const handleLoadBrands = useCallback((phrase?: string) => {
    setSearchBrands({
      sex_id: sexId,
      categories,
      brand_search: phrase ?? ''
    })
  }, [ sexId, categories, setSearchBrands ])
  
  useEffect(() => {
    document.addEventListener('click', handleClickOut)
    return () => { document.removeEventListener('click', handleClickOut) }
  }, [handleClickOut])
  
  
  return (
    <S.Wrap ref={selectRef}>
      <div onClick={() => {
        if (!opened) handleLoadBrands()
        setOpen(!opened)
      }}>
        <Input
          onChange={value => handleLoadBrands(value)}
          search={true}
          className='search-brand'
          placeholder='Введите бренд'
        />
      </div>
      
      { opened && brands.length === 0 && (
        <S.OptionContainer>
          <div className='loader'>
            { (stateOfLoadBrands === 'START' || stateOfLoadBrands === 'LOADING') ? (
              <Loader classNameBall='ball' classNameRing='loader-ring'/>
            ) :
              (<div>Не удалось найти</div>)
            }
          </div>
        </S.OptionContainer>
      ) }
      
      {
        opened && brands.length > 0 && (
          <S.OptionContainer>
            <ul className='inner'>
              { loader && (
                <Loader classNameBall='ball' classNameRing='loader-ring'/>
              ) }
              { brands.map(item => (
                <Option
                  onAdd={() => setBrands([...selectedBrands, item])}
                  onDel={() => setBrands(selectedBrands.filter(i => i !== item))}
                  key={item}
                  index={item}
                  label={item}
                  checked={selectedBrands.includes(item)}
                />
              )) }
            </ul>
          </S.OptionContainer>
        )
      }
      
      
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
  
  OptionContainer: styled.div`
    width: 265px;
    background-color: white;
    position: absolute;
    top: calc(100% + 10px);
    border-radius: 5px;
    left: 5px;
    min-height: 26px;
    z-index: 2;
    padding: 12px 10px;
    
    & .loader {
      position: relative;
    }
    
    & .loader .loader-ring {
      top: -6px;
      width: 30px;
      height: 28px;
    }
    
    & .loader .ball {
      position: absolute;
      width: 12px;
      height: 21px;
      left: 8px;
      top: 2px;
    }
    
    & .inner{
       overflow-y: auto;
       overflow-x: hidden;
       max-height: 241px;
       position: relative;
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
