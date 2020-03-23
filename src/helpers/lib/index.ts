export const sortRecord = function sortRecord <T>(obj: T): T {
  return (
    Object.fromEntries(
      Object.entries(obj).sort((a: any, b: any) => (a[0] as any - b[0] as any))
    )
  )
}

export const compareRecord = function compareRecord (obj1: any, obj2: any): boolean {
  return (JSON.stringify(sortRecord(obj1)) === JSON.stringify(sortRecord(obj2)))
}

export const sexIdToStr = function sexIdToStr (sexId: 1 | 2 | 0): 'men' | 'women' {
  if (sexId === 1) return 'men'
  return 'women'
}

export const sexStrToId = ( sexStr: 'men' | 'women' ): 1 | 2 => {
  if (sexStr === 'men') return 1
  return 2
}

export const findSexLine = ( url: string ): 1 | 2 | null => {
  if (!url.includes('men')) return null
  if (url.includes('women')) return 2
  return 1
}

export const preDetectedGender = ( propsGender: string | undefined, storeGender: 'men' | 'women' | undefined ): 'men' | 'women' | null => {
  switch (propsGender) {
    case 'men': return 'men'
    case 'women': return 'women'
    default: return storeGender ?? null
  }
}






