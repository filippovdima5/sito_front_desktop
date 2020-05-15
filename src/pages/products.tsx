import React  from 'react'
import { RouteComponentProps } from 'react-router'
import { START } from 'lib/effector'
import { useBodyScrollTop } from '../hooks/use-body-scroll-top'
import {  sexStrToId } from '../lib'
import { ProductsPage } from '../features/products-page'
import { PathParamsSex } from './routes'


export function Products({ match: { params: { sex } } }: RouteComponentProps<PathParamsSex>) {
  useBodyScrollTop()
  return <ProductsPage sexId={sexStrToId(sex)}/>
}

// !!! ssr
Products[START] = ''

