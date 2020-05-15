import React  from 'react'
import { Link } from 'react-router-dom'
import { useStore, useEvent } from 'effector-react/ssr'
import Masonry from 'react-masonry-css'
import styled from 'styled-components'
import { useEffectSafe } from '../../hooks/use-effect-safe'
import { sexIdToStr } from '../../lib'
import { BrandItem } from '../../api/types'
import { Loader } from '../../commons/templates/loader'
import { Button } from '../../ui/button'
import { $filteredBrands, $fetchBrands, $loadingBrands } from './store'
import styles from './styles.module.scss'
import { SearchInput } from './search-input'


function BrandsGroup({ brands, sexId }: {brands: Array<BrandItem>, sexId: 1 | 2}) {
  return(
    <ol>
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
    </ol>
  )
}


export function BrandsPage({ sexId }: {sexId: 1 | 2} ) {
  const loader = useStore($loadingBrands)
  const charGroups = useStore($filteredBrands)
  const fetchBrands = useEvent($fetchBrands)
  
  useEffectSafe(() => {
    fetchBrands({ sexId })
  }, [sexId])
  
  return (
    <S.Wrap>
      <S.SearchPanel>
        <div className='inner'>
          
          <SearchInput/>
        
          
          <Button className='button' type={'blur'}>Женщины</Button>
          <Button className='button' type={'blur'}>Мужчины</Button>
        </div>
      </S.SearchPanel>
      
      <div className={styles.brands}>
        {loader && <Loader/>}
        <ul className={styles.ul}>
          <Masonry
            breakpointCols={4}
            className={styles.myMasonryGrid}
            columnClassName={styles.myMasonryGrid_column}
          >
            {charGroups.map(({ char, brands }) => (
              <li className={styles.charGroup} key={char}>
                <div className={styles.charGroupContainer}>
                  <h3 className={styles.titleCard}>{char}</h3>
                  <BrandsGroup sexId={sexId} brands={brands}/>
                </div>
              </li>
            ))}
          </Masonry>
        </ul>
      </div>
    </S.Wrap>
  )
}


const S = {
  Wrap: styled.div`
    width: 100%;
    
`,
  
  SearchPanel: styled.div`
    width: 100%;
    margin-bottom: 30px;


    & .inner {
      background-color: white;
      padding: 26px 20px 27px;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      align-items: center;
      height: 100%;
      
      & .button:nth-child(1) {
        margin-left: auto;
      }
      
      & .button:hover {
        background-color: black;
        color: white;
      }
    }
`,


}
