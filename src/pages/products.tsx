import React  from 'react'
import { useLocation } from 'react-router'
import { START } from 'lib/effector'
import { useBodyScrollTop } from '../hooks/use-body-scroll-top'
import { findSexIdInPath } from '../lib'
import { ProductsPage } from '../features/products-page'



export function Products() {
  useBodyScrollTop()
  const { pathname } = useLocation()
  return <ProductsPage sexId={findSexIdInPath(pathname)}/>
}

// !!! ssr
Products[START] = ''

