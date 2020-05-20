import React from 'react'
import { Skeleton } from '../../atoms/skeleton'
import { styledProductCard as S } from './styled'
import { CardImage } from './molecules'



export function SkeletonCard() {
  return (
    <S.CardWrap itemScope itemType={'http://schema.org/Product'}>
      <S.CardContainer isLike={false}>
        
        <S.CardInner>
          <S.ImageWrap>
            <CardImage skeleton={true} src={''} title={''}/>
          </S.ImageWrap>
        
          <S.MetaInfoWrap>
            <S.Brand className='meta-item meta-span'><Skeleton style={{ height: 18 }}/></S.Brand>
            <S.Title className='meta-item meta-span'><Skeleton style={{ height: 14 }}/></S.Title>
          
          
            <S.PriceInfo className='meta-item'>
              <span style={{ width: '40%' }} className='old-price'><Skeleton style={{ height: 18 }}/></span>
              <span style={{ width: '40%' }} className='price'><Skeleton style={{ height: 18 }}/></span>
            </S.PriceInfo>
            
          </S.MetaInfoWrap>
        </S.CardInner>
      </S.CardContainer>
    </S.CardWrap>
  )
}
