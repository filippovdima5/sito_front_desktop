import { createEvent } from 'lib/effector'

export const $setUrlInfo = createEvent<{path: string, search: string}>()


