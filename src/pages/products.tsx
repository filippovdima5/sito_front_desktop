import React  from 'react'
import { RouteComponentProps } from 'react-router'
import { useEvent, useStore } from 'effector-react/ssr'
import { START } from 'lib/effector'
import { useBodyScrollTop } from '../helpers/hooks/use-body-scroll-top'
import { preDetectedGender, sexStrToId } from '../helpers/lib'
import { useEffectSafe } from '../helpers/hooks/use-effect-safe'
import { $genderInfo, $setGender } from '../stores/user'
import { $mountProductsPage } from '../features/products-page/store'
import { GenderDetected } from '../features/gender-detected'
import { ProductsPage } from '../features/products-page'


type RParams = {
  sex: 'men' | 'women' | undefined,
}


function UseSex({ sexId }: { sexId: 1 | 2 }) {
  const setGender = useEvent($setGender)
  useEffectSafe(() => {
    setGender(sexId)
  }, [])
  
  return <ProductsPage sexId={sexId}/>
}

export function Products({ match }: RouteComponentProps<RParams>) {
  useBodyScrollTop()
  const genderInfo = useStore($genderInfo)
  const gender = preDetectedGender(match.params.sex, genderInfo?.sexLine)
  
  switch (gender) {
    case 'men':
    case 'women': return <UseSex sexId={sexStrToId(gender)}/>
    default: return <GenderDetected height={66}/>
  }
}

Products[START] = $mountProductsPage

