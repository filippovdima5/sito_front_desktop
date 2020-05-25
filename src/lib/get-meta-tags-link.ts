export function getMetaTagsLink(pathname: string, search: string): string {
  let link = pathname
  if (!search) return link
  let foundFields: any = {}
  try {
    foundFields = Object.fromEntries(
      decodeURI(search).replace('?', '')
        .split('&')
        .map(i => i.split('='))
    )
  } catch (e) {
    console.error(e)
    return link
  }
  Object.entries(foundFields).forEach(([key, value]) => {
    if (key === 'categories') {
      if (!value) return
      const cats = (value as string).split(',')
      link = `${link}?categories=${cats[cats.length - 1]}`
    }
    return
  })
  return link
}
