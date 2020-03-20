import { namesCategory } from './category-keys'


export const categoriesGroupBySub = {
  1: {
    clothes: [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1010, 1011, 1012, 1013, 1000],
    shoes: [2001, 2002, 2003, 2004, 2005, 2000],
    accessories: [3001, 3002,  3004, 3005, 3006, 3007, 3008, 3009, 3011, 3000],
  },
  2: {
    clothes: [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1010, 1011, 1012, 1013, 1014, 1000],
    shoes: [2001, 2002, 2003, 2004, 2005, 2000],
    accessories: [3001, 3002, 3003, 3004, 3005, 3006, 3007, 3008, 3009, 3011, 3000],
  }
} as Record<keyof typeof namesCategory, {
  clothes: Array<keyof typeof namesCategory['1' | '2']>,
  shoes: Array<keyof typeof namesCategory['1' | '2']>,
  accessories: Array<keyof typeof namesCategory['1' | '2']>,
}>
