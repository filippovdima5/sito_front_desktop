import React, { useMemo } from 'react'
import { useEvent, useStore } from 'effector-react/ssr'
import { ShortProduct } from '../../../api/v2/types'
import { Heart } from '../../../assets/svg'
import { $likeIds, $setLike } from './store'
import { CardImage } from './molecules'
import { styledProductCard as S } from './styled'


const viewCost = (cost: number): string => {
  const first = cost/1000
  const constStr = cost.toString()
  if (first <= 1) return cost.toString()
  return `${Math.floor(first)}, ${constStr.substring(constStr.length - 3)}`
}


export function ProductCard({ id, brand, images, oldPrice, price, sale, title, sizes  }: ShortProduct) {
  const setLike = useEvent($setLike)
  const likeIds = useStore($likeIds)
  
  const isLike = useMemo(() => likeIds.includes(id), [likeIds, id])
  
  
  return (
    <S.CardWrap itemScope itemType={'http://schema.org/Product'}>
      <S.CardContainer isLike={isLike}>
        <div className='sale flag'>-{sale}%</div>
        <div onClick={() => setLike(id)} className='like flag'>
          <div className='like-container'>
            <Heart className='svg-heart'/>
          </div>
        </div>
        
        <S.CardInner>
          <S.ImageWrap>
            <CardImage src={images[0]} title={title}/>
          </S.ImageWrap>
          
          <S.MetaInfoWrap>
            <S.Brand className='meta-item meta-span'>{brand}</S.Brand>
            <S.Title className='meta-item meta-span'>{title}</S.Title>

            
            <S.PriceInfo className='meta-item'>
              <span className='old-price'>{viewCost(oldPrice)} RUB</span>
              <span className='price'>{viewCost(price)} RUB</span>
            </S.PriceInfo>
            
            { sizes && sizes.length > 0 && (
              <S.Sizes className='meta-item'>
                {sizes.map(size => (
                  <span key={size} className='size'>{size}</span>
                ))}
              </S.Sizes>
            )}
            
          </S.MetaInfoWrap>
        </S.CardInner>
      </S.CardContainer>
    </S.CardWrap>
  )
}








