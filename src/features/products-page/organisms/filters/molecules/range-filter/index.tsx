import React, { useCallback,  useState }  from 'react'
import { useEffectSafe } from '../../../../../../helpers/hooks/use-effect-safe'

import styles from '../filter-layout.module.scss'
import { Input } from '../../../../../../commons/atoms/input'

import { BtnDone } from '../../atoms/btn-done'


type Props = {
  storeData: Array<number>,
  stateData: Array<number | null> | null,
  filter_to: 'price_to' | 'sale_to',
  filter_from: 'price_from' | 'sale_from',
}

const initValue = (store: Props['storeData'], state: Props['stateData'], type: 0 | 1): number => {
  if (state === null) return store[type]
  if (state[type] === null) return store[type]

  return state[type] as NonNullable<number>
}


export function RangeFilter({ storeData, stateData, filter_from, filter_to }: Props) {
  const [ isHolderMin, setIsHolderMin ] = useState<boolean>(false)
  const [ isHolderMax, setIsHolderMax ] = useState<boolean>(false)

  const [min, setMin] = useState<number | null>(initValue(storeData, stateData, 0))
  const [max, setMax] = useState<number | null>(initValue(storeData, stateData, 1))

  const handleSetMin = useCallback((newValue: string) => {
    const str = newValue.split(' ')
    if ( str[1] ) {
      const newValue = Number(str[1])
      if (isNaN(newValue)) return setMin(null)
      else return setMin(newValue)
    }
    else setMin(null)
  }, [])

  const handleSetMax = useCallback((newValue: string) => {
    const str = newValue.split(' ')
    if ( str[1] ) {
      const newValue = Number(str[1])
      if (isNaN(newValue)) return setMax(null)
      else return setMax(newValue)
    }
    else setMax(null)
  }, [])


  const handleBlurMin = useCallback(() => {
    if (min === null || min <= storeData[0]) {
      setMin(storeData[0])
      setIsHolderMin(true)
    } else {
    
    }
  }, [min, filter_from, storeData])

  const handleBlurMax = useCallback(() => {
    if (max === null || max >= storeData[1]) {
      setMax(storeData[1])
      setIsHolderMax(true)

    } else {
    
    }
  }, [max, filter_to, storeData])


  useEffectSafe(() => {
    if (min === storeData[0]) setIsHolderMin(true)
    else setIsHolderMin(false)
  }, [min])

  useEffectSafe(() => {
    if (max === storeData[1]) setIsHolderMax(true)
    else setIsHolderMax(false)
  }, [max])


  return (
    <>

      <div className={styles.header}>
        <div className={styles.inputWrap}>
          <Input
            onBlur={handleBlurMin}
            onFocus={() => setMin(null)}
            onChange={(event => {handleSetMin(event.currentTarget.value)})}
            value={`от ${min ?? ''}`}
            type={'tel'}
            isPlaceholder={isHolderMin}
          />
        </div>

        <div className={styles.inputWrap}>
          <Input
            onBlur={handleBlurMax}
            onChange={(event => {handleSetMax(event.currentTarget.value)})}
            value={`до ${max ?? ''}`}
            onFocus={() => setMax(null)}
            type={'tel'}
            isPlaceholder={isHolderMax}
          />
        </div>
      </div>



      <div className={styles.space}/>
      <BtnDone onClick={() => console.log('g')} title={'Готово'}/>
    </>
  )
}
