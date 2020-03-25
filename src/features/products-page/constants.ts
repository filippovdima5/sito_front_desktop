import { TypesSortProducts } from '../../api/types'


export const sortersName = {
  update_up: 'По новизне',
  price_up: 'По цене',
  sale_up: 'По скидке'
} as Record<TypesSortProducts, string>

export const filtersName = {
  categories: 'Категории',
  brands: 'Бренды',
  sizes: 'Размеры',
  colors: 'Цвета',
  prices: 'Цена',
  sales: 'Скидка',
  favorite: 'Топовые товары'
} as const

