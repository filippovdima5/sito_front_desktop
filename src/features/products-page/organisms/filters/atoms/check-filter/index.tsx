import React, { useMemo } from 'react'
import {useEvent, useStore} from 'effector-react/ssr'
import { filtersName } from '../../constants'
import { BoolFilters } from '../../types'
import { $setSomeFilter } from '../../../../store'
import { $filtersViewRecordState } from '../../store'
import styles from './styles.module.scss'


type Props = {
  title: BoolFilters,
}

export function CheckFilter(props: Props) {
  const data = useStore($filtersViewRecordState)[props.title]
  const setSomeFilter = useEvent($setSomeFilter)
  
  
  const check = useMemo(() => Boolean(data), [data])
  
  return (
    <label className={styles.checkRow}>
      <input
        readOnly={true}
        checked={check}
        onClick={() => setSomeFilter({ key: props.title, value: !Boolean(check) })}
        type={'checkbox'}
        className={styles.checkbox}
      />
      <span className={styles.icon}/>
      <span className={styles.title}>{filtersName[props.title]}</span>
    </label>
  )
}
