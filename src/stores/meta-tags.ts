import { createEffect, createStore } from 'lib/effector'
import { SeoReqParams } from '../api/v1/types'
import { api } from '../api/v1'


// Фетчи будут через debounce:


export const $metaTags = createStore({
  title: 'SITO - сайт выгодных скидок. Каталог акций в интернет-магазинах.',
  description: 'Все скидки рунета на SITO: поиск выгодных цен на одежду, обувь и аксессуары в интернет-магазинах. Агрегатор скидок – акции от 50%'
})

export const fetchMetaTags = createEffect({
  handler: (params: SeoReqParams) => api.seo.getSeo(params)
})
