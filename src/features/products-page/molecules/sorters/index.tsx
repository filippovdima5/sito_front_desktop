import React, { useState } from 'react'
import styled from 'styled-components'
import { useInterval } from '../../../../hooks/use-interval'
import { Close, Arrow } from '../../../../assets/svg'


const data1: Array<string> = []
for (let i = 0; i < 0; i++) {
  data1.push(i.toString())
}
const sortes = ['По цене', 'По новизне', ' По скидке', 'По цене', 'По новизне', ' По скидке']


export function Sorters() {
  const [ data, setData ] = useState(data1)
  
  const [ showSort, setShowSort ] = useState(false)
  
  useInterval(() => {
    const arr: Array<string> = []
    for (let i = 0; i < 20; i++) {
      arr.push(i.toString())
    }
    setData(arr)
  }, 5000)
  
  const handleClose = (key: string) => {
    setData(data.filter(item => item !== key))
  }
  
  return (
    <S.Wrap>
      <S.HeaderContainer>
        <div className='text'>Фильтры:</div>
        
        
        <S.Sort showSort = {showSort}>
          <div className='sort-container'>
            
            <div className='sort-select' onClick={() => setShowSort(!showSort)}>
              Сортировать <Arrow rotate={showSort ? 180 : 0} className='arrow-svg'/>
            </div>
            
            { showSort && (
              <S.SortOptionsContainer>
                { sortes.map(sort => (
                  <div key={Math.random().toString()} className='sort-option'>{sort}</div>
                )) }
              </S.SortOptionsContainer>
            ) }
          </div>
        </S.Sort>
      </S.HeaderContainer>
      
      { data && data.length > 0 && (
        <S.FiltersContainer>
          <div className='filters-scroll'>
            { data.map((item, i) => {
              // eslint-disable-next-line max-len
              if  (i % 2 === 0) return <S.FilterButton onClick={() => handleClose(item)} key={Math.random().toString()}>Размер: Adidas <Close className='close-svg'/></S.FilterButton>
              // eslint-disable-next-line max-len
              if (i % 3 === 0 ) return <S.FilterButton onClick={() => handleClose(item)} key={Math.random().toString()}>Бренд: Goochi <Close className='close-svg'/></S.FilterButton>
              return <S.FilterButton onClick={() => handleClose(item)} key={Math.random().toString()}>Це: 3045<Close className='close-svg'/></S.FilterButton>
            }) }
          </div>
        </S.FiltersContainer>
      ) }
      
    </S.Wrap>
  )
}


const S = {
  Wrap: styled.div`
    background-color: #FFFFFF;
    margin-bottom: 33px;
    box-shadow: 0 0 20px rgba(189, 189, 189, 0.25);
    padding: 0 40px;
`,
  
  HeaderContainer: styled.div`
    height: 60px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    
    & .text {
      display: flex;
      align-items: center;
      font-size: 18px;
      line-height: 21px;
      color: rgba(0,0,0,0.8);
      user-select: none;
    }
`,
  
  Sort: styled.div<{ showSort: boolean }>`
    position: relative;
    z-index: 9;
    
    & .sort-container {
       box-shadow: ${({ showSort }) => showSort ? '0 0 10px rgba(189, 189, 189, 0.25)' : '0 0 10px rgba(189, 189, 189, 0)'};
    
       user-select: none;
       background-color: #FFFFFF;
       position: absolute;
       right: 0;
       top: 10px;
       min-width: 200px;
       min-height: 40px;
    }
   
     & .sort-select {
        cursor: pointer;
        position: relative;
        text-align: right;
        height: 40px;
        font-size: 18px;
        line-height: 38px;
        padding-right: 45px;
        color: rgba(0,0,0,0.8);
        user-select: none;
     }

    & .arrow-svg {
        fill: rgba(0,0,0,0.8);
        position: absolute;
        right: 15px;
        top: 51%;
      }
   
    & .sort:hover .arrow-svg {
       fill: rgba(0,0,0);
    }
`,
  
  SortOptionsContainer: styled.div`
    background-color: white;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-end;
    box-sizing: border-box;
    
    
    & .sort-option {
      width: 100%;
      cursor: pointer;
      padding: 12px 20px 13px;
      color: rgba(39,39,39,0.8);
      box-sizing: border-box;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      text-align: right;
    }
    
    & .sort-option:nth-child(2) {
      background: #E6E6E6;
    }
    
`,
  
  FiltersContainer: styled.div`
    max-height: 115px;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    padding-right: 40px;
    
    & .filters-scroll {
      margin-bottom: 25px;
    }
`,
  
  
  FilterButton: styled.button`
    border: 1px solid rgba(203,203,203,0.5);
    box-sizing: border-box;
    border-radius: 5px;
    background-color: transparent;
    font-family:  sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: rgba(39,39,39,0.8);
    padding: 10px 41px 11px 10px;
    margin: 5px;
    position: relative;
    
    & .close-svg {
      fill: #9D9D9D;
      position: absolute;
      top: 50%;
      right: 10px;
    }
    
    &:hover {
      background: #E6E6E6;
    }
    
    &:hover .close-svg {
      fill: #272727;
    }
`
}


// import { useEvent, useStore } from 'effector-react/ssr'
// import { sortersName } from '../../constants'
// import { $setSort, $mainState } from '../../store'
// import { TypesSortProducts } from '../../../../api/types'
// import styles from './styles.module.scss'


// const { sort } = useStore($mainState)
//   const setSort = useEvent($setSort)
//
//   return (
//     <div className={styles.sorters}>
//       <div className={styles.inner}>
//         <div className={styles.header}>
//           <span className={styles.title}>
// 							Сортировать по:
//           </span>
//         </div>
//
//         <div className={styles.body}>
//           <div className={styles.sort_btn}>
//             {Object.entries(sortersName).map(([key, value]) => (
//               <button
//                 onClick={() => setSort((key as TypesSortProducts))}
//                 key={key}
//                 className={sort === key ? styles.btnActive : styles.btn}
//               >
//                 {value}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
