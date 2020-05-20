import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { Arrow } from '../../../assets/svg'


type Props = {
  title: string,
  search?: React.ReactNode,
}

export const FilterCurtain: FC<Props> = (props) => {
  const [ active, setActive ] = useState(false)
  
  return (
    <S.Wrap>
      <S.Header
        onClick = {() => setActive(!active)}
        active={active}>
        {props.title}
        <Arrow rotate={active ? 180 : 0} className='arrow-svg'/>
      </S.Header>
      {active && (
        <S.Body>
          { props.search && <S.SearchContainer>{props.search}</S.SearchContainer> }
          <S.ScrollContainer>
            <ul>{props.children}</ul>
          </S.ScrollContainer>
          <div className='space'/>
        </S.Body>
      )}
    </S.Wrap>
  )
}


const S = {
  Wrap: styled.div`
    user-select: none;
    //border: 1px solid green;
    background-color: #FFFFFF;
    padding: 18px 25px 0;
`,
  
  Header: styled.div<{ active: boolean }>`
    cursor: pointer;
    border-bottom: ${({ active }) => active ? '1px solid #E7E7E7' : '1px solid rgba(0,0,0,0)'};
    padding-bottom: 18px;
    font-size: 18px;
    line-height: 1;
    position: relative;
    
    & .arrow-svg {
      position: absolute;
      top: calc(50% - 9px);
      width: 20px;
      height: 10px;
      right: 0;
      fill:  #000000;
    }
`,
  
  Body: styled.div`
    padding-top: 20px;
    
    & .space {
      padding-bottom: 20px;
    }
`,
  
  SearchContainer: styled.div`
    margin-bottom: 20px;
    
    border: 1px solid green;
`,
  
  ScrollContainer: styled.div`
    max-height: 300px;
    overflow-x: hidden;
    overflow-y: auto;
`
}
