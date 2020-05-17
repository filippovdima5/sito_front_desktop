import { TypesSortProducts } from '../../api/v1/types'
import {categoryKeys, unisexCategoryKeys} from '../../constants'
import {SexId} from '../../types'


export const sortersName = {
  update_up: 'По новизне',
  price_up: 'По цене',
  sale_up: 'По скидке'
} as Record<TypesSortProducts, string>


export const sortTypes = {
  'sale_up' : 'Сначала большие скидки',
  'create_up': 'Сначала новые',
  'price_up': 'Сначала подешевле',
  'sale_down' : 'Сначала скидки поменьше',
  'price_down': 'Сначала подороже',
  //'create_down': { createdAt: -1 },
} as const


export const valuesOfFilterButtons = {
  categories: (value: number, sexId: SexId) => `Категория: ${categoryKeys[sexId][value as keyof typeof categoryKeys['1' | '2']]}`,
  brands: (value: string) => `Бренд: ${value}`,
  sizes: (value: string) => `Размер: ${value}`,
  price_from: (value: number) => `Цена: от ${value} RUB`,
  price_to: (value: number) => `Цена: до ${value} RUB`,
  sale_from: (value: number) => `Скидка: от ${value}%`,
  sale_to: (value: number) => `Скидка: до ${value}%`,
}
