import path from 'path'
import Koa from 'koa'
import serve from 'koa-static'
import mount from 'koa-mount'
import logger from 'koa-logger'
import proxy from 'koa-proxy'
import LRU from 'lru'
import { api } from '../api'
import { findSexLine } from '../helpers/lib'
import { render } from './render'
import { createCache } from './utils/create-cache'


const renderLRU = new LRU<string>({ max: 10, maxAge: 60 * 1000 })
const cacheRender = createCache(renderLRU)


const app = new Koa()

const setupKoa = () => {
  if (process.env.NODE_ENV !== 'production') {
    app.use(mount('/static', serve(`${path.resolve(__dirname, 'static')}`)))
    app.use(mount('/cdn', serve(`${path.resolve(__dirname, 'cdn')}`)))
    app.use(mount('/icons', serve(`${path.resolve(__dirname, 'icons')}`)))
    app.use(mount('/favicon', serve(`${path.resolve(__dirname, '/')}`)))
    app.use(mount('/loadable-stats', serve(`${path.resolve(__dirname, '/')}`)))
    app.use(mount('/precache-manifest', serve(`${path.resolve(__dirname, '/')}`)))
  
    app.use(mount('/api', proxy({
      host: 'http://localhost:8080',
      map: path => `/api${path}`
    })))
  
    app.use(logger())
  }

  
  app.use(async (ctx) => {
    let sexIdUser: 1 | 2 | null = null
    const { url } = ctx
    const [ path, search ] = url.split('?')
  
    const cookie = ctx.cookies.get('user')
    if (cookie){
      const { data: { sex_id } } = await api.user.getIdUser({ id: cookie })
      if (sex_id) sexIdUser = sex_id
    }
    const sexInUrl = findSexLine(url)
    if (sexInUrl !== null) sexIdUser = sexInUrl
  
  
    const cacheKey = `${path}_${search}_${sexIdUser}`
    ctx.body = await cacheRender(() => render({ path, search, sexId: sexIdUser }), cacheKey)()
    if (ctx.status !== 200) {
      renderLRU.remove(cacheKey)
    }
  })
  
  app.listen(9001, () => {console.log('app started: 9001')})
}

setupKoa()
