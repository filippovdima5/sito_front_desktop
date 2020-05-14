import React  from 'react'
import { RouteComponentProps } from 'react-router'
import { useBodyScrollTop } from '../hooks/use-body-scroll-top'
import { sexStrToId } from '../lib'
import { $mountBrandsPage } from '../features/brands-page/store'
import { BrandsPage } from '../features/brands-page'
import { START } from '../lib/effector'
import { PathParamsSex } from './routes'



export function Brands({ match: { params: { sex } } }: RouteComponentProps<PathParamsSex>) {
  useBodyScrollTop()
  return <BrandsPage sexId={sexStrToId(sex)}/>
}

// !!! SSR
Brands[START] = $mountBrandsPage
