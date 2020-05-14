import React from 'react'
import { Redirect, RouteComponentProps } from 'react-router'
import { useEvent, useStore } from 'effector-react/ssr'
import { useBodyScrollTop } from '../hooks/use-body-scroll-top'
import { sexStrToId, preDetectedGender } from '../lib'

import { $genderInfo, $setGender } from '../stores/user'

import { GenderDetected } from '../features/gender-detected'
import { HomePage } from '../features/home-page'
import { useEffectSafe } from '../hooks/use-effect-safe'



type RParams = {
  sex: 'men' | 'women' | undefined,
}


function UseGender({ sexId }: { sexId: 1 | 2 }) {
  const setGender = useEvent($setGender)
  useEffectSafe(() => {
    setGender(sexId)
  }, [])
  return (
    <HomePage sexId={sexId}/>
  )
}


function HomeWrap({ sex }: { sex: RParams['sex'] }) {
  const genderInfo = useStore($genderInfo)
  const gender = preDetectedGender(sex, genderInfo?.sexLine)
  

  
  switch (gender) {
    case 'men':
    case 'women': return <UseGender sexId={sexStrToId(gender)}/>
    default: return <GenderDetected/>
  }
}


export function Home({ match }: RouteComponentProps<RParams>) {
  useBodyScrollTop()
  
  if (match.url === '/') return <Redirect to={'/home'}/>
  return <HomeWrap sex={match.params.sex}/>
}
