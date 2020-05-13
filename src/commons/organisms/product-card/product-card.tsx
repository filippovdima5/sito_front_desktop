import React from 'react'
import styled from 'styled-components'
import { ShortProduct } from '../../../api/types'
import { Heart } from '../../../assets/svg'
import { CardImage } from './molecules'


interface ProductsCardProps extends ShortProduct{
  showLike: boolean,
}

const viewCost = (cost: number): string => {
  const first = cost/1000
  const constStr = cost.toString()
  if (first <= 1) return cost.toString()
  return `${Math.floor(first)}, ${constStr.substring(constStr.length - 3)}`
}


export function ProductCard({ id, brand, img, oldprice, price, sale, title, url, showLike, sizes  }: ProductsCardProps) {
  return (
    <S.CardWrap itemScope itemType={'http://schema.org/Product'}>
      <S.CardContainer>
        <div className='sale flag'>-{sale}%</div>
        <div className='like flag'>
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


const S = {
  CardWrap: styled.div`
    // Потом можно прокидывать через пропсы размер отступов для разных мест расположения карточки!
    padding: 7.5px;

    box-sizing: border-box;
    width: 25%;
    user-select: none;
    cursor: pointer;
`,
  
  CardContainer: styled.div`
    width: 100%;
    padding-bottom: 187.965616%;
    position: relative;
    
    & .flag {
      position: absolute;
      width: 44px;
      height: 30px;
      right: 0;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    & .sale {
      font-family: 'Open Sans', sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 1;
      text-align: center;
      background-color: #ED6C50;
      color: #FFFFFF;
      top: 0;
    }
    
    & .like {
      background-color: rgba(0,0,0,0.4);
      top: 40px;
      
      & .like-container {
        width: 100%;
        height: 100%;
        position: relative;
        
        
      }
    }
    
`,
  
  CardInner: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
`,
  
  ImageWrap: styled.div`
    flex: 0.67682927;
`,
  
  MetaInfoWrap: styled.div`
    flex: 0.32317073;

    & .meta-item {
       font-family: 'Open Sans', sans-serif;
       font-style: normal;
       text-align: center;
       //width: 62.464183%;
       //left: 50%;
       //transform: translateX(-50%);
       color:  #272727;
    }
`,
  
  Brand: styled.div`
    font-size: 18px;
    line-height: 25px;
    margin: 2.730659% auto 0;
    
    width: 80%;
    
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  
`,
  
  Title: styled.div`
    font-size: 14px;
    line-height: 19px;
    margin: 1.146132% auto 0;
    
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    
    opacity: 0.8;
    &:first-letter {
      text-transform: uppercase;
    }
`,
  
  Sizes: styled.div`
    width: 95%;
    margin: 4% auto 0;
    text-align: center;
    display: inline-flex;
    flex-flow: wrap;
    justify-content: center;
    white-space: normal;
    opacity: 0.8;
    
    & .size {
      font-size: 14px;
      display: inline;
      padding: 0 2px;
      text-transform: uppercase;
    }
    
    
`,

  PriceInfo: styled.div`
    width: 100%;
    margin: 6% auto 0;
    text-align: center;
    font-size: 18px;
    line-height: 25px;
    display: flex;
    justify-content: center;
    flex-flow: nowrap;
    box-sizing: border-box;
    
    & .price, & .old-price {
      //width: 50%;
      box-sizing: border-box;
    }
    
    & .old-price {
      text-decoration: line-through;
      opacity: 0.8;
      margin-right: 8px;
      
    }
    
    & .price {
    margin-left: 8px;
      font-weight: bold;
      color: #ED6C50;
    }
    
`
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





