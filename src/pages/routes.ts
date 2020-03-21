import { Home } from './home'
import { NotFound } from './not-found'
import { Products } from './products'


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
    path: '*',
    component: NotFound,
  },
]
