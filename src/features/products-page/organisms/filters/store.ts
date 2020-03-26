import { filtersState, $filtersStore } from '../../store'
import { filtersName } from './constants'
import { FiltersList } from './types'


export const $filtersViewRecordState = filtersState.map(state => ({
  categories: state.categories,
  brands: state.brands,
  sizes: state.sizes,
  colors: state.colors,
  favorite: state.favorite,
  prices: (state.price_from !== null || state.price_to !== null) ? [state.price_from, state.price_to] : null,
  sales: (state.sale_from !== null || state.sale_to !== null) ? [state.sale_from, state.sale_to] : null,
}))

export const $filtersViewRecordStore = $filtersStore.map(state => ({
  categories: state === null ? [] : state.categories ,
  brands: state === null ? [] : state.brands,
  sizes: state === null ? [] : state.sizes,
  colors: state === null ? [] : state.colors,
  favorite: state === null ? [] : state.favorite,
  prices: state === null ? [] : (state.price_from !== null || state.price_to !== null) ? [state.price_from, state.price_to] : null,
  sales: state === null ? [] : (state.sale_from !== null || state.sale_to !== null) ? [state.sale_from, state.sale_to] : null,
}))



export const $filtersView = $filtersViewRecordState.map(state => Object.keys(state)
  // eslint-disable-next-line
  .map(key => {
    switch (key) {
      case 'categories': return ({
        name: key,
        type: 'list-translate'
      })
      case 'brands':
      case 'sizes':
      case 'colors': return ({
        name: key as keyof typeof filtersName,
        type: 'list' as 'list'
      })
      case 'prices':
      case 'sales': return ({
        name: key as keyof typeof filtersName,
        type: 'range' as 'range'
      })
      case 'favorite': return ({
        name: key as keyof typeof filtersName,
        type: 'bool' as 'bool'
      })
    }
  }) as FiltersList
)


