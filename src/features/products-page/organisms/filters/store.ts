import { filtersState } from '../../store'
import { namesCategory } from '../../../../constants/category-keys'
import { filtersName } from '../../constants'



const $filtersViewRecord = filtersState.map(state => ({
  categories: state.categories,
  brands: state.brands,
  sizes: state.sizes,
  colors: state.colors,
  favorite: state.favorite,
  prices: (state.price_from !== null || state.price_to !== null) ? [state.price_from, state.price_to] : null,
  sales: (state.sale_from !== null || state.sale_to !== null) ? [state.sale_from, state.sale_to] : null,
}))




export const $filtersView = $filtersViewRecord.map(state => Object.entries(state)
  //eslint-disable-next-line
  .map(([key, value]) => {
    const index: keyof typeof state = key as keyof typeof state
    switch (index) {
      case 'categories': return ({
        name: index as keyof typeof filtersName,
        data: value as  Array<keyof typeof namesCategory['1' | '2']> | null,
        type: 'list-translate' as 'list-translate'
      })
      case 'brands':
      case 'sizes':
      case 'colors': return ({
        name: index as keyof typeof filtersName,
        data: value as Array<string> | null,
        type: 'list' as 'list'
      })
      case 'prices':
      case 'sales': return ({
        name: index as keyof typeof filtersName,
        data: value as [number, number] | null,
        type: 'range' as 'range'
      })
      case 'favorite': return ({
        name: index as keyof typeof filtersName,
        data: value as boolean | null,
        type: 'bool' as 'bool'
      })
    }
  })
)


