import React from 'react'
import { NotFoundPage } from '../features/not-found-page'
import { INFO } from '../lib/effector'


export function NotFound() {
  return <NotFoundPage/>
}


NotFound[INFO] = 'NOT_FOUND'
