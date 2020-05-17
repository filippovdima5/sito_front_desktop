import React  from 'react'
import { useStore } from 'effector-react/ssr'
import { $loading, $statusPageProducts, $products } from '../../new-store'
import { ProductCard, SkeletonCard } from '../../../../commons/organisms/product-card'
import config from '../../../../config'
import { StatusPage } from '../../types'
import { Loader } from '../../../../commons/templates/loader'
import { EmptyList } from './empty-list'
import styles from './styles.module.scss'



function SkeletonsList({ length }: { length: number }) {
  return <>{Array.from({ length }).map((_, i) => (<SkeletonCard key={i}/>))}</>
}

function ProductsList() {
  const data = useStore($products)
  return (
    <>
      {data.map(item => (
        <ProductCard key={item.id} {...item}/>
      ))}
    </>
  )
}

//      

function Controller({ status, loading }: { status: StatusPage, loading: boolean }) {
  switch (status) {
    case 'EMPTY': return (<EmptyList/>)
    case 'FAIL': return (<div>ОШИБКА</div>)
    default: return (
      <div className={styles.productsList}>
        <ProductsList/>
        {(loading || status === 'START') && !config.ssr && <SkeletonsList length={20}/>}
      </div>
    )
  }
}

function List() {
  const status = useStore($statusPageProducts)
  const loading = useStore($loading)

  
  return (
    <div className={styles.wrap}>
      {loading && <Loader/>}
      <Controller status={status}  loading={loading}/>
    </div>
  )
}

export { List as ProductsList }
