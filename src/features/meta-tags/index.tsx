import React from 'react'
import Helmet from 'react-helmet'
import { useStore } from 'effector-react/ssr'
import { $metaTags } from '../../stores/location-listen'


export function MetaTags() {
  const { title, description, link } = useStore($metaTags)
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta
        name="description"
        content={description}
      />
      <link rel="canonical" href={`https://sito.store${link}`} />
      <link rel="alternate" hrefLang="rus" href={`https://m.sito.store${link}`}/>
    </Helmet>
  )
}
