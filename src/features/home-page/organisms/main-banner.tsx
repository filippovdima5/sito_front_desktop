import React from 'react'
import styled from 'styled-components'
import { Button } from '../../../ui/button'
import { Select } from '../../../ui/select'


export function MainBanner() {
  return(
    <S.Wrap>
      <img
        className='mainBanner'
        alt={'sito'}
        src={'/assets/main-banner.jpg'}
      />
      
      <S.Container>
        <S.Inner>
        
          <S.Title>
            Все скидки в одном месте
          </S.Title>
          
          <S.ButtonsContainer>
            <Button  title={'Мужчины'}/>
            <Button title={'Женщины'}/>
            
            <Select
              multi
              options={[{ key: 1, label: 'sko' }]}
              title={'Все категории'}
            />
            
            <Select
              search
              multi
              options={[{ key: 1, label: 'sko' }]}
              title={'Введите бренд'}
            />
            
          </S.ButtonsContainer>
          
          <Button className='black-button' type={'black'}>
            Искать скидки
          </Button>
        
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
    }
`,
  
  Title: styled.h1`
    font-family: 'Abhaya Libre', serif;
    font-style: normal;
    font-weight: 600;
    font-size: 48px;
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
