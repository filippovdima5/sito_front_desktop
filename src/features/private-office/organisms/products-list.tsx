import React from 'react'
import styled from 'styled-components'
import { useEvent, useStore } from 'effector-react/ssr'
import { $likeProducts, $loadingLikeProducts, $fetchLikeProducts, $stateFetchProducts } from '../store'
import { Loader } from '../../../commons/templates/loader'
import { EmptyPage } from '../molecules'
import { useEffectSafe } from '../../../hooks/use-effect-safe'
import { ProductCard } from '../../../commons/organisms/product-card'



/** Нужно реализовать статус товаров как в $statusPageProducts! */

export function ProductsList() {
  const data = useStore($likeProducts)
  const loading = useStore($loadingLikeProducts)
  const fetchLikeProducts = useEvent($fetchLikeProducts)
  const stateOfLoad = useStore($stateFetchProducts)
  
  useEffectSafe(() => { fetchLikeProducts() }, [])
  
  
  if (data.length === 0) return (
    <S.Wrap>
      { stateOfLoad === 'LOADING' || stateOfLoad === 'START' ? (
        <Loader/>
      ) : (
        <EmptyPage/>
      ) }
    </S.Wrap>
  )
  
  return (
    <S.Wrap>
      {loading && <Loader/>}
      <div className='products-list'>
        { data.map(({ oldPrice, images, sale, sizes, price, title, brand, categoryId,colors, id, sexId, url }) => (
          <ProductCard
            key={id}
            url={url}
            id={id}
            title={title}
            brand={brand}
            sexId={sexId}
            categoryId={categoryId}
            sizes={sizes}
            colors={colors}
            images={images}
            price={price}
            oldPrice={oldPrice}
            sale={sale}/>
        )) }
      </div>
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
     
      
   &   .products-list {
    flex: 1;
    box-sizing: border-box;
    margin: -7.5px;

    position: relative;
    z-index: 1;

    display: flex;
    flex-flow: wrap;
    justify-content: flex-start;
    width: 100%;
  }
`
}
