import { Home } from './home'
import { NotFound } from './not-found'
import { Products } from './products'
import { Brands } from './brands'


export const ROUTES = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/home/:sex?',
    component: Home,
  },
  {
    path: '/products/:sex?',
    component: Products,
  },
  {
    path: '/brands/:sex?',
    component: Brands,
  },
  {
    path: '*',
    component: NotFound,
  },
]
