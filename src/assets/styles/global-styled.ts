import { createGlobalStyle } from 'styled-components'


export function fontFace(name: string, src: string, fontWeight: string | number = 'normal', fontStyle = 'normal'){
  /* eslint-disable */
  return `
      @font-face{
          font-family: "${name}";
          src: url(${require('../fonts/' + src + '.woff')}) format("woff"),
               url(${require('../fonts/' + src + '.woff2')}) format("woff2"),
               url(${require('../fonts/' + src + '.ttf')}) format("truetype");

          font-style: ${fontStyle};
          font-weight: ${fontWeight};
      }
  `;
}


export const GlobalStyle = createGlobalStyle`
    ${fontFace('Raleway', 'raleway/ralewaythin', 100, 'normal')}
    ${fontFace('Raleway', 'raleway/ralewayregular', 400, 'normal')}
    ${fontFace('Raleway', 'raleway/ralewaymedium', 500, 'normal')}
    ${fontFace('Raleway', 'raleway/ralewaybold', 600, 'normal')}
`
