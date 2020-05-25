import React from 'react'
import styled from 'styled-components'
import { Header } from '../header'
import { Pages } from '../../pages'
import { Footer } from '../footer'
import config from '../../config'
import BackToTop from '../../commons/molecules/back-to-top'
import { GlobalStyle } from '../../assets/styles/global-styled'


export function AppTemplate() {
  return (
    <>
      <GlobalStyle/>
      <S.App>
        <S.Header>
          <Header/>
        </S.Header>
        
        <S.Container>
          <S.Main>
            <Pages/>
          </S.Main>
      
          <S.Footer>
            <Footer/>
          </S.Footer>
        </S.Container>
    
        {!config.ssr && <BackToTop/>}
      </S.App>
    </>
  )
}

const S = {
  App: styled.div`
    display: flex;
    flex-flow: column;
    min-height: 100vh;
    margin: 0 auto;
    box-sizing: border-box;
  
    font-family: 'Raleway', sans-serif;
    background-color: #f2f2f2;    
`,
  
  Header: styled.header`
    height: 60px;
    background-color: white;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
`,
  
  Container: styled.div`
    height: calc(100vh - 60px);

    display: flex;
    flex-flow: column;
    box-sizing: border-box;
`,
  
  Main: styled.main`
      padding: 0 39px;
      margin: 33px auto 50px;
      max-width: 1400px;

      flex: 1;
      display: flex;
      box-sizing: border-box;
      width: 100%;
`,
  
  Footer: styled.footer`
      margin-top: auto;
      width: 100%;
      box-sizing: border-box;
`
}
