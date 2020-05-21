import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { SexId } from '../../../types'
import { Button1 } from '../../../commons/atoms'
import { useEffectSafe } from '../../../hooks/use-effect-safe'
import { encodeProductsUrl } from '../../products-page/lib'
import { SelectCategory, SearchBrands } from '../molecules'



export function MainBanner({ sexId }: { sexId: SexId }) {
  const [sex_id, setSexId] = useState(sexId)
  const [ categories, setCategories ] = useState<Array<number>>([])
  const [brands, setBrands] = useState<Array<string>>([])
  
  useEffectSafe(() => { setSexId(sexId) }, [sexId])
  const urlSearchSale = useMemo(() => encodeProductsUrl({ sex_id, categories, brands }), [sex_id, categories, brands])
  
  
  return(
    <S.Wrap>
      <img
        className='mainBanner'
        alt={'sito'}
        src={'/assets/main-banner.jpg'}
      />
      
      <S.Container>
        <S.Inner>
        
          <S.Title>Все скидки в одном месте</S.Title>
          
          <S.ButtonsContainer>
            <S.WrapItemForm active={sexId === 1}>
              <Button1 href={'/men/home'} className='button' borderRad={5}>Мужчины</Button1>
            </S.WrapItemForm>
  
            <S.WrapItemForm active={sexId === 2}>
              <Button1 href={'/women/home'} className='button' borderRad={5}>Женщины</Button1>
            </S.WrapItemForm>
            
            <S.WrapItemForm>
              <SelectCategory
                setCategory={(cats: Array<number>) => setCategories(cats)}
                sexId={sex_id}
                categories={categories}
              />
            </S.WrapItemForm>
            
            
            <S.WrapItemForm>
              <SearchBrands
                setBrands={setBrands}
                selectedBrands={brands}
                categories={categories}
                sexId={sex_id}
              />
            </S.WrapItemForm>
            
          </S.ButtonsContainer>
          
          <Button1 type={'large'} href={urlSearchSale} className='black-button'>
            Искать скидки
          </Button1>
        
        </S.Inner>
      </S.Container>
    </S.Wrap>
  )
}




const S = {
  Wrap: styled.div`
    user-select: none;
    padding-bottom: 33.1540013%;
    box-sizing: border-box;
    position: relative;
    
    & .mainBanner{
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      display: block ;
    }
`,
  
  WrapItemForm: styled.div<{ active?: boolean}>`
    margin: 0 5px;
    
    & .button {
      background-color: ${({ active }) => active ? '#FFFFFF' : 'rgba(5,9,18,0.5)'};
      color: ${({ active }) => active ? 'rgba(39,39,39,0.8)' : 'rgba(255,255,255,0.8)' };
      
      border: 1px solid transparent;
      text-transform: uppercase;
      font-size: 14px;
      line-height: 16px;

      width: 170px;
    }
    
    & .search-brand {
       width: 216px;
       border: transparent;
       
       background-color: ${({ active }) => active ? '#FFFFFF' : 'rgba(5,9,18,0.5)'};
       color: ${({ active }) => active ? 'rgba(39,39,39,0.8)' : 'rgba(255,255,255,0.8)' };
    }
    
    &  .icon-search { fill: #FFFFFF !important; }
`,
  
  Container: styled.div`
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    z-index: 2;
    display: flex;
    flex-flow: column;
    justify-content: center;
`,
  
  Inner: styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    
    & .black-button{
      position: absolute;
      bottom: 24.137931%;
      left: 50%;
      transform: translateX(-50%);
      text-transform: uppercase;
      border-radius: 5px;
      background-color: #272727;
      border: transparent;
      font-weight: bold;
      color: white;
      width: 218px;
    }
`,
  
  Title: styled.h1`
    font-family: 'Circe', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 50px;
    line-height: 42px;
    width: 100%;
    color: #FFFFFF;
    text-align: center;
    position: absolute;
    top: 24.94929%;
    user-select: none;
`,
  
  ButtonsContainer: styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    position: absolute;
    top: 41.58215%
`
}
