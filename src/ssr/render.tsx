import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { matchRoutes } from 'react-router-config'
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import { fork, serialize, allSettled } from 'effector/fork'
import { rootDomain, START, INFO } from 'lib/effector'
import { Helmet } from 'react-helmet'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { Context } from 'koa'
import { App } from '../app'
import { ROUTES } from '../pages/routes'
import { $setUrl } from '../stores/location-listen'
import { template } from './template'
import { settledEvents } from './settled-events'


const clientStatsFile = path.resolve(__dirname, './loadable-stats.json')
const clientExtractor = new ChunkExtractor({ statsFile: clientStatsFile, entrypoints: ['main'] })


type Params = {
  path: string,
  search: string,
}

export const render = async (ctx: Context, { path, search }: Params) => {
  const scope = fork(rootDomain)
  const matches = matchRoutes(ROUTES, path) as Array<{ route: { component: any } }>
  const infoPages = matches
    .map((match) => match.route.component ? match.route.component[INFO] : undefined)
    .filter(Boolean)
  
  if (infoPages.includes('NOT_FOUND')) ctx.status = 404
  
  const events = matches
    .map((match) => match.route.component ? match.route.component[START] : undefined)
    .filter(Boolean)
  
  
  await Promise.all([
    allSettled($setUrl, { scope, params: { pathname: path, search: search ? `?${search}` : ''  } }),
    settledEvents({ events, search, scope, path })
  ])
    .catch(err => {
      console.error(err)
      ctx.status = 500
    })
  
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
    ctx.status = 500
    return '<div>Что то пошло не так!</div><br/><a href="https://sito.store">Главная</a>'
  }
}





