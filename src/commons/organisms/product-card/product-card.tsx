import React, { useMemo } from 'react'
import { useEvent, useStore } from 'effector-react/ssr'
import { ShortProduct } from '../../../api/types'
import { Heart } from '../../../assets/svg'
import { $likes, $setLike } from '../../../stores/user'
import { CardImage } from './molecules'
import { styledProductCard as S } from './styled'



const viewCost = (cost: number): string => {
  const first = cost/1000
  const constStr = cost.toString()
  if (first <= 1) return cost.toString()
  return `${Math.floor(first)}, ${constStr.substring(constStr.length - 3)}`
}


export function ProductCard({ id, brand, img, oldprice, price, sale, title, sizes  }: ShortProduct) {
  const likeIds = useStore($likes)
  const setLike = useEvent($setLike)
  
  
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
            <CardImage src={img[0]} title={title}/>
          </S.ImageWrap>
          
          <S.MetaInfoWrap>
            <S.Brand className='meta-item meta-span'>{brand}</S.Brand>
            <S.Title className='meta-item meta-span'>{title}</S.Title>

            
            <S.PriceInfo className='meta-item'>
              <span className='old-price'>{viewCost(oldprice)} RUB</span>
              <span className='price'>{viewCost(price)} RUB</span>
            </S.PriceInfo>
            
            { sizes && sizes.length !== null && (
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



















//   const wrapImgRef = useRef(null)

//       <div itemScope itemType={'http://schema.org/Product'}>
//         <div ref={wrapImgRef} className={styles.wrapImg}>
//           <span>
//             <ProductImage
//               wrapHeight = {wrapImgRef}
//               src={img[0]}
//               alt={title}
//             />
//           </span>
//         </div>
//
//         <div className={styles.footer}>
//           <div itemProp={'name'} className={styles.brand}>{brand}</div>
//           <div itemProp={'description'} className={styles.title}>{title}</div>
//
//           <div itemProp="offers" itemScope itemType={'http://schema.org/Offer'} className={styles.cost}>
//             <del className={styles.old_price}>{oldprice} ₽</del>
//             <span itemProp={'price'} className={styles.price}>{price}  <span itemProp={'priceCurrency'}>RUB</span></span>
//           </div>
//
//           <div className={styles.sale}>-{sale}%</div>
//         </div>
//       </div>
//
//       <a
//         className={styles.href}
//         href={url}
//         // eslint-disable-next-line
//         target="_blank"
//         rel="nofollow noreferrer"
//       >.</a>
//
//       {showLike && <Like currentId={id}/>}





