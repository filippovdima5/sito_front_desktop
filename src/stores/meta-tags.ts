import { createEffect, createStore } from '../lib/effector'
import { MetaTags } from '../api/v2/types'
import { apiV2 } from '../api'


export const $metaTags = createStore<MetaTags>({
  link: '/',
  title: 'SITO - сайт выгодных скидок. Каталог акций в интернет-магазинах.',
  description: 'Все скидки рунета на SITO: поиск выгодных цен на одежду, обувь и аксессуары в интернет-магазинах. Агрегатор скидок – акции от 50%'
})

export const fetchMetaTags = createEffect({
  handler: (params: { link: string }) => apiV2.getMetaTags(params)
})

$metaTags.on(fetchMetaTags.done, (state, { result: { data } }) => data)
