import path from 'path'
import Koa from 'koa'
import serve from 'koa-static'
import mount from 'koa-mount'
import logger from 'koa-logger'
import proxy from 'koa-proxy'
import LRU from 'lru'
import { findSexIdInPathNotStrict, sexIdToStr } from '../lib'
import { apiV2 } from '../api'
import { render } from './render'
import { createCache } from './utils/create-cache'


const renderLRU = new LRU<string>({ max: 1000, maxAge: 1000 * 60 * 10 })
const cacheRender = createCache(renderLRU)


const app = new Koa()

const setupKoa = () => {
  if (process.env.NODE_ENV !== 'production') {
    app.use(mount('/static', serve(`${path.resolve(__dirname, 'static')}`)))
    app.use(mount('/assets', serve(`${path.resolve(__dirname, 'assets')}`)))
    app.use(mount('/icons', serve(`${path.resolve(__dirname, 'icons')}`)))
    app.use(mount('/favicon', serve(`${path.resolve(__dirname, '/')}`)))
    app.use(mount('/loadable-stats', serve(`${path.resolve(__dirname, '/')}`)))
    app.use(mount('/precache-manifest', serve(`${path.resolve(__dirname, '/')}`)))
  
    app.use(mount('/api/v2', proxy({
      host: 'http://localhost:8080',
      map: path => `/api/v2${path}`
    })))
  
    app.use(logger())
  }

  
  app.use(async (ctx) => {
    const { url } = ctx
    const [ path, search ] = url.split('?')
    
    // Узнаем пол из роута:
    let sexIdUser: 1 | 2 | null = findSexIdInPathNotStrict(path) ?? null
    
    // Если из роута не неь пола, то ищем в куках:
    if (!sexIdUser) {
      const cookie = ctx.cookies.get('session-sito')
      if (cookie) {
        const { data } = await apiV2.session.getSessionById({ id: cookie }).catch(() => ({ data : null }))
        if (data?.sex_id) sexIdUser = data.sex_id
      }
    
      // Если из кук удалось определить, то редиректим на роут, с нужным полом:
      if (sexIdUser) {
        const sexLine = sexIdToStr(sexIdUser)
        if (path === '/') return ctx.redirect(`/${sexLine}/home`)
        else return ctx.redirect(`/${sexLine}${path}`)
      }
    }
    // В итоге пол в любом случае известен, кроме новых пользователей пришедших по роуту без пола:
  
    
    
    const cacheKey = `${path}_${search}_${sexIdUser}`
    ctx.body = await cacheRender(() => render(ctx, { path, search }), cacheKey)()
    if (ctx.status !== 200) {
      renderLRU.remove(cacheKey)
    }
  })
  
  app.listen({ host: '127.0.0.1', port: 9001 }, () => {console.info('App desktop started: 9001')})
}

setupKoa()
