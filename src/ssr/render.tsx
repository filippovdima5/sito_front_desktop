import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { matchRoutes } from 'react-router-config'
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import { fork, serialize, allSettled } from 'effector/fork'
import { rootDomain, START } from 'lib/effector'
import { Helmet } from 'react-helmet'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { App } from '../app'
import { ROUTES } from '../pages/routes'
import { $setUrl } from '../stores/location-listen'
import { template } from './template'


const clientStatsFile = path.resolve(__dirname, './loadable-stats.json')
const clientExtractor = new ChunkExtractor({ statsFile: clientStatsFile, entrypoints: ['main'] })


export const render = async ({ path, search }: { path: string, search: string }) => {
  const scope = fork(rootDomain)
  
  
  // Сетим информацию о пользователе и локейшене страницы
  await Promise.all([
    allSettled($setUrl, { scope, params: { pathname: path, search: search ? `?${search}` : ''  } })
    // allSettled($setUrlInfo, { scope, params: { path, search } }),
    // allSettled($setGender, { scope, params: sexId })
  ])
  
  
  
  const sheet = new ServerStyleSheet()
  
  const routerContext: Record<string, any> = {}
  try {
    const jsx = (
      <StyleSheetManager sheet={sheet.instance}>
        <ChunkExtractorManager extractor={clientExtractor}>
          <StaticRouter context={routerContext} location={path}>
            <App root={scope} />
          </StaticRouter>
        </ChunkExtractorManager>
      </StyleSheetManager>
    )
    
    const html = ReactDOMServer.renderToString(jsx)
    const preloadedState = serialize(scope)
    const scripts = clientExtractor.getScriptTags()
    const styleTags = clientExtractor.getStyleTags() + '\n' + sheet.getStyleTags()
    const helmet = Helmet.renderStatic()
    
    
    return template({ html, preloadedState,  styleTags,  scripts, helmet }).split('').join('')
  } catch (e) {
    console.error(e)
    return ''
  }
}




// // Ищем ивенты для первоночального стейта заматченных страниц и сетим их
// const pageEvents = matchRoutes(ROUTES, path)
//   .map((match) =>
//     // @ts-ignore
//     match.route.component ? match.route.component[START] : undefined,
//   )
//   .filter(Boolean)
//
//
// if (pageEvents.length > 0){
//   try {
//     await Promise.all(pageEvents.map(event => allSettled(event, { scope, params: undefined })))
//   } catch (error) {
//     console.error(error)
//   }
// }
//endregion render
