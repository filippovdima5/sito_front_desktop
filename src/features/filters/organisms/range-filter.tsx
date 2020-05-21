import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useEvent } from 'effector-react/ssr'
import { QueryFields } from '../../products-page/types'
import { FilterCurtain } from '../templates'
import { Input } from '../../../commons/atoms'
import { $addOneFilterValue } from '../../products-page/store'
import { defaultFields } from '../../products-page/constants'


type Props = {
  title: string,
  range_key: Array<keyof QueryFields>,
  value: [number, number],
}

export function RangeFilter(props: Props) {
  const addOneFilterValue = useEvent($addOneFilterValue)
  
  const value = useMemo(() => props.value.map(item => {
    if (!item) return ''
    if (item >= defaultFields[props.range_key[1]]) return ''
    if (item <= defaultFields[props.range_key[0]]) return ''
    return item.toString()
  }), [props.value, props.range_key])
  
  return (
    <FilterCurtain title={props.title}>
      <S.Container>
        <S.Wrap>
          <Input
            notBorderRad={true}
            placeholder='от'
            value={value[0]}
            onChange={value => {
              if (isNaN(Number(value))) return
              if (!value) return addOneFilterValue({ key: props.range_key[0], value: defaultFields[props.range_key[0]] as number })
              addOneFilterValue({ key: props.range_key[0], value: Number(value) })
            }}
          />
        </S.Wrap>
        
        <S.Wrap>
          <Input
            notBorderRad={true}
            placeholder='до'
            value={value[1]}
            onChange={value => {
              if (isNaN(Number(value))) return
              if (!value) return addOneFilterValue({ key: props.range_key[1], value: defaultFields[props.range_key[1]] as number })
              addOneFilterValue({ key: props.range_key[1], value: Number(value) })
            }}
          />
        </S.Wrap>
      </S.Container>
    </FilterCurtain>
  )
}


const S = {
  Container: styled.data`
    display: flex;
    box-sizing: border-box;
    flex-wrap: nowrap;
    justify-content: space-between;
`,
  
  Wrap: styled.div`
    width: 50%;
    box-sizing: border-box;
    
    &:nth-child(1) { padding-right: 5px }
    &:nth-last-child(1) { padding-left: 5px }
`
}
