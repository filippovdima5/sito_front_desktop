import { Home } from './home'
import { NotFound } from './not-found'


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
    path: '*',
    component: NotFound,
  },
]
