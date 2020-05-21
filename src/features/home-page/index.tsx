import React from 'react'
import styled from 'styled-components'
import { SexId } from '../../types'
import { useBodyScrollTop } from '../../hooks/use-body-scroll-top'
import { MainBanner, BrandBanner, SaleBanners } from './organisms'


export function HomePage({ sexId }: { sexId: SexId }) {
  useBodyScrollTop()
  
  return (
    <S.Wrap>
      <div>
        <MainBanner sexId={sexId}/>
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
