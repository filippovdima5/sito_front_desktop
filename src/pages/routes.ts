import { GenderDetected } from './start-page'
import { Home } from './home'
import { NotFound } from './not-found'
import { Products } from './products'
import { Brands } from './brands'


export type PathParamsSex = { sex: 'men' | 'women' }


export const ROUTES = [
  // Редирект на /home, если станет известен пол ( нужно разобраться с редиректом на SSR )
  { path: '/', exact: true, component: GenderDetected },
  
  
  { path: '/:sex/home', exact: true, component: Home },
  
  { path: '/:sex/products', exact: true, component: Products },
  
  { path: '/:sex/brands', exact: true, component: Brands },
  
  
  { path: '*', exact: true, component: NotFound },
]
