import React, { useRef } from 'react'
import { ShortProduct } from '../../../api/types'
import { Like } from '../../../features/like'
import { ProductImage } from './product-image/ProductImage'
import styles from './styles.module.scss'


interface ProductsCardProps extends ShortProduct{
  showLike: boolean,
}



export function ProductCard({ id, brand, img, oldprice, price, sale, title, url, showLike  }: ProductsCardProps) {
  const wrapImgRef = useRef(null)
  
  return (
    <div className={styles.card}>
      
      <div itemScope itemType={'http://schema.org/Product'}>
        <div ref={wrapImgRef} className={styles.wrapImg}>
          <span>
            <ProductImage
              wrapHeight = {wrapImgRef}
              src={img[0]}
              alt={title}
            />
          </span>
        </div>

        <div className={styles.footer}>
          <div itemProp={'name'} className={styles.brand}>{brand}</div>
          <div itemProp={'description'} className={styles.title}>{title}</div>

          <div itemProp="offers" itemScope itemType={'http://schema.org/Offer'} className={styles.cost}>
            <del className={styles.old_price}>{oldprice} ₽</del>
            <span itemProp={'price'} className={styles.price}>{price}  <span itemProp={'priceCurrency'}>RUB</span></span>
          </div>

          <div className={styles.sale}>-{sale}%</div>
        </div>
      </div>
      
      <a
        className={styles.href}
        href={url}
        // eslint-disable-next-line
        target="_blank"
        rel="nofollow noreferrer"
      >.</a>
      
      {showLike && <Like currentId={id}/>}
    </div>
  )
}
