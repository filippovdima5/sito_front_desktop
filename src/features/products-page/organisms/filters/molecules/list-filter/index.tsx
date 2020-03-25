import React, { useState, useMemo, useEffect } from 'react'
import { FiltersItemNumber, FiltersItemString, FiltersRequest } from '../../../../../../api/types'
import { namesCategory } from '../../../../../../constants/category-keys'


import { CheckRow } from '../../atoms/check-row'
import { Input } from '../../../../../../commons/atoms/input'
import { BtnDone } from '../../atoms/btn-done'
import { BtnHelp } from '../../atoms/btn-help'

import styles from '../filter-layout.module.scss'


type Props = {
  storeData: FiltersRequest['brands' | 'categories' | 'colors' | 'sizes'],
  stateData: Array<string | number> | null,
  sexId: 1 | 2,
  filter: 'brands' | 'categories' | 'colors' | 'sizes',
}

const titleVew = (title: number | string | null, sexId: 1 | 2): string => {
  switch (typeof title) {
    case 'object': return ''
    case 'number': return namesCategory[sexId][title as keyof typeof namesCategory['1' | '2'] ]
    default: return title
  }
}

const maxItemsView = 35

export function ListFilter({ sexId, stateData, storeData, filter }: Props) {
  const [showAll, setShowAll] = useState<boolean>(storeData.length < maxItemsView)
  const [ searchPhrase, setSearchPhrase ] = useState<string | null>(null)


  useEffect(() => {
    if (searchPhrase !== null) setShowAll(true)
    if (searchPhrase === '') setSearchPhrase(null)
  }, [ searchPhrase ])

  const dataList = useMemo(() => {

    // todo: Выпилить на серваке возможность проскачки null!!!
    const preData = (storeData as Array<FiltersItemString | FiltersItemNumber>).filter(item => item.value != null )

    if (searchPhrase !== null) {
      const reqExp = new RegExp(`${searchPhrase}`, 'i')
      return (preData as Array<FiltersItemString | FiltersItemNumber>)
        .filter(item => ( item.value.toString().search(reqExp) > 0 ))
        .sort((a, b) => ( b.value.toString().search(reqExp) - a.value.toString().search(reqExp) ))
    }

    if (showAll) return  preData
    return  preData.slice(0, maxItemsView)

  }, [storeData, showAll, searchPhrase ])


  return (
    <>
      {
        storeData.length > maxItemsView && filter !== 'categories' &&(

          <div className={styles.header}>
            <div className={styles.inputWrap}>

              <Input
                onChange={(event => { setSearchPhrase( event.currentTarget.value ) })}
                type={'text'}
                placeholder={'Поиск'}
              />

            </div>
          </div>

        )
      }


      <div>
        {(dataList as Array<FiltersItemString | FiltersItemNumber>).map(({ available, value }) => (
          <div
            className={styles.wrapInputCheck}
            key = {value}>
            <CheckRow
              title={titleVew(value, sexId)}
              check={stateData === null ? false : stateData.includes(value)}
              disabled={!available}
              event={() => {console.log('d')}}
            />
          </div>
        ))}
      </div>


      <BtnHelp title={'Показать ещё'} onClick={() => (setShowAll(true))} visible={!showAll}/>

      <BtnHelp title={'Сбросить'} onClick={() => {console.log('d')}} />

      <div className={styles.space}/>

      <BtnDone onClick={() => {console.log('d')}} title={'Готово'}/>

    </>
  )
}

