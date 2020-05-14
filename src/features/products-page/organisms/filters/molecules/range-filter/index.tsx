import React, { useCallback,  useState }  from 'react'
import { useStore, useEvent } from 'effector-react/ssr'
import { useEffectSafe } from '../../../../../../hooks/use-effect-safe'
import { Input } from '../../../../../../commons/atoms/input'
import { RangeFilters } from '../../types'
import { $filtersViewRecordState, $filtersViewRecordStore } from '../../store'
import { $setSomeFilter } from '../../../../store'
import styles from './styles.module.scss'
import { setRangeFilter } from './lib'


type Props = {
  storeData: Array<number>,
  stateData: Array<number | null> | null,
  nameFilter: RangeFilters
}


const initValue = (store: Props['storeData'], state: Props['stateData'], type: 0 | 1): number => {
  if (state === null) return store[type]
  if (state[type] === null) return store[type]

  return state[type] as NonNullable<number>
}


function RangeFilter({ storeData, stateData, nameFilter }: Props) {
  const setSomeFilter = useEvent($setSomeFilter)
  
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
      setSomeFilter(setRangeFilter({ key: nameFilter, type: 'min', value: null }))
    } else {
      setSomeFilter(setRangeFilter({ key: nameFilter, type: 'min', value: min }))
    }
  }, [min, storeData, setSomeFilter, nameFilter])
  
  const handleBlurMax = useCallback(() => {
    if (max === null || max >= storeData[1]) {
      setMax(storeData[1])
      setIsHolderMax(true)
      setSomeFilter(setRangeFilter({ key: nameFilter, type: 'max', value: null }))
    } else {
      setSomeFilter(setRangeFilter({ key: nameFilter, type: 'min', value: max }))
    }
  }, [max, storeData, setSomeFilter, nameFilter])
  
  
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
    </>
  )
}




function WrapRangeFilter(props: { nameFilter: RangeFilters }) {
  const stateData = useStore($filtersViewRecordState)[props.nameFilter]
  const storeData = useStore($filtersViewRecordStore)[props.nameFilter]
  if (storeData === null) return null
  return <RangeFilter nameFilter={props.nameFilter}  stateData={stateData} storeData={storeData}/>
}


export { WrapRangeFilter as RangeFilter }
