import React  from 'react'
import { Link } from 'react-router-dom'
import { useStore, useEvent } from 'effector-react/ssr'
import Masonry from 'react-masonry-css'
import { useEffectSafe } from '../../helpers/hooks/use-effect-safe'
import { sexIdToStr } from '../../helpers/lib'
import { BrandItem } from '../../api/types'
import { Input } from '../../commons/atoms/input'
import { Loader } from '../../commons/templates/loader'
import { $filteredBrands, $fetchBrands, $setFilterString, $loadingBrands } from './store'
import styles from './styles.module.scss'



type Props = {
  sexId: 1 | 2,
}


function BrandsGroup({ brands, sexId }: {brands: Array<BrandItem>, sexId: 1 | 2}) {

  return(
    <>
      {brands.map(({ _id }) => (
        <li   
          className={styles.item} 
          key={_id}>
          <Link
            to={`/products/${sexIdToStr(sexId)}?brands=${_id}`}
          >
            {_id}
          </Link>
        </li>
      ))}
    </>
  )
}

function MasonryLayout({ sexId }: Props) {
  const charGroups = useStore($filteredBrands)
  const fetchBrands = useEvent($fetchBrands)
  
  useEffectSafe(() => {
    fetchBrands({ sexId })
  }, [sexId])

  
  return (
    <ul className={styles.card}>
      {charGroups.map(({ char, brands }) => (
        <li className={styles.charGroup} key={char}>
          <h3 className={styles.titleCard}>{char}</h3>
          <ol className={styles.itemsCard}>
            <BrandsGroup sexId={sexId} brands={brands}/>
          </ol>
        </li>
      ))}
    </ul>
  )
}

export function BrandsPage({ sexId }: {sexId: 1 | 2} ) {
  const loader = useStore($loadingBrands)
  return (
    <div className={styles.brands}>
      {loader && <Loader/>}
      <Masonry
        breakpointCols={4}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {<MasonryLayout sexId={sexId}/>}
      </Masonry>
    </div>
  )
}
