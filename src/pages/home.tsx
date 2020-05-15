import React from 'react'
import {  RouteComponentProps } from 'react-router'
import { useBodyScrollTop } from '../hooks/use-body-scroll-top'
import { sexStrToId } from '../lib'
import { HomePage } from '../features/home-page'
import { START } from '../lib/effector'
import { PathParamsSex } from './routes'


export function Home({ match: { params: { sex } } }: RouteComponentProps<PathParamsSex>) {
  useBodyScrollTop()
  return <HomePage sexId={sexStrToId(sex)}/>
}


// !!! SSR
Home[START] = ''
