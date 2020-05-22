import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useStore, useEvent } from 'effector-react/ssr'
import Masonry from 'react-masonry-css'
import styled from 'styled-components'
import { useEffectSafe } from '../../hooks/use-effect-safe'
import { sexIdToStr } from '../../lib'
import { Loader } from '../../commons/templates/loader'
import { SexId } from '../../types'
import { Button1 } from '../../commons/atoms'
import { $brands, $mountBrandsPage, $loadingBrands } from './store'
import styles from './styles.module.scss'
import { SearchInput } from './search-input'


function BrandsGroup({ brands, sexId }: {brands: Array<string>, sexId: 1 | 2}) {
  const sex = useMemo(() => sexIdToStr(sexId), [sexId])
  
  return(
    <ol>
      {brands.map(item => (
        <li   
          className={styles.item} 
          key={item}>
          <Link
            to={`/${sex}/products?brands=${item}`}
          >
            {item}
          </Link>
        </li>
      ))}
    </ol>
  )
}


export function BrandsPage({ sexId }: {sexId: SexId} ) {
  const loader = useStore($loadingBrands)
  const charGroups = useStore($brands)
  const mountBrandsPage = useEvent($mountBrandsPage)
  
  useEffectSafe(() => {
    mountBrandsPage({ sex_id: sexId })
  }, [sexId])
  
  return (
    <S.Wrap>
      <S.SearchPanel activeBtn={sexIdToStr(sexId)}>
        <div className='inner'>
          <SearchInput sexId={sexId}/>
          <Button1 borderRad={5} className='button men' href={'/men/brands'}>Мужчины</Button1>
          <Button1 borderRad={5} className='button women' href={'/women/brands'}>Женщины</Button1>
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
  
  SearchPanel: styled.div<{ activeBtn: string }>`
    width: 100%;
    margin-bottom: 30px;


    & .inner {
      background-color: white;
      padding: 15px 20px 16px;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      align-items: center;
      height: 100%;
      
      .men {
          background-color: ${({ activeBtn }) => activeBtn === 'men' ? '#272727' : 'rgba(0,0,0,0.1)'};
          color: ${({ activeBtn }) => activeBtn === 'men' ? 'white' : 'gba(39,39,39,0.8)'};
      }
      
      .women {
          background-color: ${({ activeBtn }) => activeBtn === 'women' ? '#272727' : 'rgba(0,0,0,0.1)'};
          color: ${({ activeBtn }) => activeBtn === 'women' ? 'white' : 'gba(39,39,39,0.8)'};
      }
      
      & .button {
        margin: 0 5px;
        border: transparent;
      }
      
      & .button:nth-child(1) {
        margin-left: auto;
      }
      
      & .button:hover {
        background-color: rgba(0,0,0,0.3);
        color: white;
      }
    }
`,


}
