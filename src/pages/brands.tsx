import React  from 'react'
import { RouteComponentProps } from 'react-router'
import { useEvent, useStore } from 'effector-react/ssr'
import { useBodyScrollTop } from '../helpers/hooks/use-body-scroll-top'
import { preDetectedGender, sexStrToId } from '../helpers/lib'
import { useEffectSafe } from '../helpers/hooks/use-effect-safe'
import { $genderInfo, $setGender } from '../stores/user'
import { $mountBrandsPage } from '../features/brands-page/store'
import { GenderDetected } from '../features/gender-detected'
import { BrandsPage } from '../features/brands-page'
import { START } from '../lib/effector'


type RParams = {
  sex: 'men' | 'women' | undefined,
}


function UseSex({ sexId }: { sexId: 1 | 2 }) {
  const setGender = useEvent($setGender)
  useEffectSafe(() => {
    setGender(sexId)
  }, [])
  
  return <BrandsPage sexId={sexId}/>
}


export function Brands({ match }: RouteComponentProps<RParams>) {
  useBodyScrollTop()
  const genderInfo = useStore($genderInfo)
  const gender = preDetectedGender(match.params.sex, genderInfo?.sexLine)
  
  switch (gender) {
    case 'men':
    case 'women': return <UseSex sexId={sexStrToId(gender)}/>
    default: return <GenderDetected height={66}/>
  }
}

Brands[START] = $mountBrandsPage
