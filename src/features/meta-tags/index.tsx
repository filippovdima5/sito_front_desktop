import React from 'react'
import Helmet from 'react-helmet'
import { useStore } from 'effector-react/ssr'
import { $metaTags } from '../../stores/meta-tags'



export function MetaTags() {
  const { title, description } = useStore($metaTags)
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta
        name="description"
        content={description}
      />
    </Helmet>
  )
}
