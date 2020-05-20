import React from 'react'
import {  useLocation } from 'react-router'
import { useBodyScrollTop } from '../hooks/use-body-scroll-top'
import { findSexIdInPath } from '../lib'
import { HomePage } from '../features/home-page'
import { START } from '../lib/effector'


export function Home() {
  useBodyScrollTop()
  const { pathname } = useLocation()
  return <HomePage sexId={findSexIdInPath(pathname)}/>
}


// !!! SSR
Home[START] = ''
