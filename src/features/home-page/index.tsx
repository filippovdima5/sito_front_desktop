import React from 'react'
import styled from 'styled-components'
import { SexId } from '../../types'
import { MainBanner, BrandBanner, SaleBanners } from './organisms'


export function HomePage({ sexId }: { sexId: SexId }) {
  
  return (
    <S.Wrap>
      <div>
        <MainBanner/>
        <BrandBanner/>
        <SaleBanners/>
      </div>
    </S.Wrap>
  )
}


const S = {
  Wrap: styled.div`
    width: 100%;
    box-sizing: border-box;
`
}
