import React from 'react'
import styled from 'styled-components'
import { useStore } from 'effector-react/ssr'
import { $likeProducts, $loadingLikeProducts } from '../store'
import { Loader } from '../../../commons/templates/loader'
import { EmptyPage } from '../molecules'



/** Нужно реализовать статус товаров как в $statusPageProducts! */

export function ProductsList() {
  const data = useStore($likeProducts)
  const loading = useStore($loadingLikeProducts)
  
  if (data.length === 0) return (
    <S.Wrap>
      <EmptyPage/>
    </S.Wrap>
  )
  
  return (
    <S.Wrap>
      {loading && <Loader/>}
      
    </S.Wrap>
    
  )
}
    
const S = {
  Wrap: styled.div`
      height: 100%;
      background-color: transparent;
      width: 100%;
      position: relative;
      display: flex;
`
}
