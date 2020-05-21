import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { useEvent } from 'effector-react/ssr'
import { Search } from '../../assets/svg'
import { SexId } from '../../types'
import { $setFetchBrands } from './store'


export function SearchInput({ sexId }: { sexId: SexId }) {
  const placeholder = useRef('Поиск бренда')
  const [ focus, setFocus ] = useState(false)
  const [ value, setValue ] = useState('')
  
  const setFetchBrands = useEvent($setFetchBrands)
  
  return (
    <S.Search>
      <Search className='search-svg'/>
      
      <S.SearchInput
        placeholder={!focus ? placeholder.current : value}
        value={focus ? value : (value ?? placeholder.current)}
        onChange={e => {
          setValue(e.target.value)
          setFetchBrands({ sex_id: sexId, phrase: e.target.value })
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </S.Search>
  )
}


const S = {
  Search: styled.div`
    flex: 1;
    margin-right: 50px;
    height: 40px;
    padding: 0 60px;
    position: relative;
    
    & .search-svg {
      fill: black;
      position: absolute;
      left: 30px;
      top: 50%;
      width: 21px;
      height: 21px;
    }
`,
  
  SearchInput: styled.input`
    background-color: transparent;
    height: 100%;
    width: 100%;
    color: #272727;
    font-size: 18px;
    line-height: 21px;
`
}
