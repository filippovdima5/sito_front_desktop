import { createGlobalStyle } from 'styled-components'
import { resetStyles } from './reset'


export function fontFace(name: string, src: string, fontWeight: string | number = 'normal', fontStyle = 'normal'){
  return `
      @font-face{
          font-family: "${name}";
          src: url(${require('../fonts/' + src + '.woff')}) format("woff"),
               url(${require('../fonts/' + src + '.woff2')}) format("woff2"),
               url(${require('../fonts/' + src + '.ttf')}) format("truetype");

          font-style: ${fontStyle};
          font-weight: ${fontWeight};
      }
  `
}


export const GlobalStyle = createGlobalStyle`
    // RALEWAY:
    ${fontFace('Raleway', 'raleway/ralewaythin', 100, 'normal')}
    
    
    ${fontFace('Raleway', 'raleway/ralewayregular', 400, 'normal')}
    ${fontFace('Raleway', 'raleway/ralewaymedium', 500, 'normal')}
    ${fontFace('Raleway', 'raleway/ralewaybold', 600, 'normal')}
    
    // CIRCE:
    ${fontFace('Circe', 'сirce/Circe-Thin', 100, 'normal')}
    
    ${fontFace('Circe', 'сirce/Circe-Light', 300, 'normal')}
    ${fontFace('Circe', 'сirce/Circe-Regular', 400, 'normal')}
    ${fontFace('Circe', 'сirce/Circe-ExtraBold', 600, 'normal')}
    
    // open-sans:
    ${fontFace('Circe', 'open-sans/OpenSans-Light', 300, 'normal')}
    ${fontFace('Circe', 'open-sans/OpenSans-Regular', 400, 'normal')}
    ${fontFace('Circe', 'open-sans/OpenSans-Bold', 600, 'normal')}
    
    
    // ResetStyles:
    ${resetStyles}

`
