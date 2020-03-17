import React from 'react'
import { Redirect, RouteComponentProps } from 'react-router'
import { useEvent, useStore } from 'effector-react/ssr'
import { useBodyScrollTop } from '../helpers/hooks/use-body-scroll-top'
import { sexStrToId, preDetectedGender } from '../helpers/lib'

import { $genderInfo, $setGender } from '../stores/user'

import { GenderDetected } from '../features/gender-detected'
import { useEffectSafe } from '../helpers/hooks/use-effect-safe'



type RParams = {
  sex: 'men' | 'women' | undefined,
}


function UseGender({ sexId }: { sexId: 1 | 2 }) {
  const setGender = useEvent($setGender)
  useEffectSafe(() => {
    setGender(sexId)
  }, [])
  return (
    <div>HOME PAGE</div>
  )
}


function HomeWrap({ sex }: { sex: RParams['sex'] }) {
  const genderInfo = useStore($genderInfo)
  const gender = preDetectedGender(sex, genderInfo?.sexLine)
  

  
  switch (gender) {
    case 'men':
    case 'women': return <UseGender sexId={sexStrToId(gender)}/>
    default: return <GenderDetected height={66}/>
  }
}


export function Home({ match }: RouteComponentProps<RParams>) {
  useBodyScrollTop()
  
  if (match.url === '/') return <Redirect to={'/home'}/>
  return <HomeWrap sex={match.params.sex}/>
}
