import React  from 'react'
import { useLocation } from 'react-router'
import { useBodyScrollTop } from '../hooks/use-body-scroll-top'
import { findSexIdInPath } from '../lib'
import { $mountBrandsPage } from '../features/brands-page/store'
import { BrandsPage } from '../features/brands-page'
import { START } from '../lib/effector'



export function Brands() {
  useBodyScrollTop()
  const { pathname } = useLocation()
  return <BrandsPage sexId={findSexIdInPath(pathname)}/>
}

// !!! SSR
Brands[START] = $mountBrandsPage
