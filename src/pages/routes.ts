import { AboutAs } from '../features/about-us-page'
import { GenderDetected } from './start-page'
import { Home } from './home'
import { NotFound } from './not-found'
import { Products } from './products'
import { Brands } from './brands'



export const ROUTES = [
  // Редирект на /home, если станет известен пол ( нужно разобраться с редиректом на SSR )
  { path: '/', exact: true, component: GenderDetected },
  
  { path: '/men/home', exact: true, component: Home },
  { path: '/women/home', exact: true, component: Home },
  
  { path: '/men/products', exact: true, component: Products },
  { path: '/women/products', exact: true, component: Products },
  
  { path: '/men/brands', exact: true, component: Brands },
  { path: '/women/brands', exact: true, component: Brands },
  
  { path: '/about', exact: true, component: AboutAs },
  { path: '/men/about', exact: true, component: AboutAs },
  { path: '/women/about', exact: true, component: AboutAs },
  
  { path: '*', exact: true, component: NotFound },
]
