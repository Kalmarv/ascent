import { Colors } from '../types/types'

export const expandCols = (arr: Colors[], count: number) => {
  let pickedColors = []

  for (let i = 0; i < count; i++) {
    pickedColors.push(arr[i % arr.length])
  }

  return pickedColors
}
