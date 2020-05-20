import { GenderDetected } from './start-page'
import { Home } from './home'
import { NotFound } from './not-found'
import { Products } from './products'
import { Brands } from './brands'


export type PathParamsSex = { sex: 'men' | 'women' }


export const ROUTES = [
  // Редирект на /home, если станет известен пол ( нужно разобраться с редиректом на SSR )
  { path: '/', exact: true, component: GenderDetected },
  
  { path: '/men/home', exact: true, component: Home },
  { path: '/women/home', exact: true, component: Home },
  
  { path: '/men/products', exact: true, component: Products },
  { path: '/women/products', exact: true, component: Products },
  
  { path: '/men/brands', exact: true, component: Brands },
  { path: '/women/brands', exact: true, component: Brands },
  
  { path: '*', exact: true, component: NotFound },
]
