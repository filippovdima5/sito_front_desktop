export function setItemToArray<T>(array: null | Array<T>, value: T): Array<T> | null {
  if (array === null) return [value]
  
  if (array.includes(value)) {
    const arr = array.filter(item => item !== value)
    if (arr.length === 0) return null
    return arr
  }
  
  return array.concat([value])
}



