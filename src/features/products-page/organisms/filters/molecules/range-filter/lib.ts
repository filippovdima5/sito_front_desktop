import { RangeFilters, MainRangeFilters } from '../../types'


type InParams = { key: RangeFilters, type: 'min' | 'max', value: null | number }
type OutParams = { key: keyof MainRangeFilters, value: number | null }

export const setRangeFilter = ({ key, type, value }: InParams): OutParams => {
  if (type === 'min') {
    switch (key) {
      case 'prices': return { key: 'price_from', value }
      case 'sales': return { key: 'sale_from', value }
    }
  } else {
    switch (key) {
      case 'prices': return { key: 'price_to', value }
      case 'sales': return { key: 'sale_to', value }
    }
  }
}



