// the @types package was not really working
// FIXME: make pull request for @types/extract-colors or make it work
//@ts-ignore
import extractColors from 'extract-colors'
import { Colors } from '../types/types'

export const getColors = async (imageURL: string): Promise<Colors[]> => {
  const colorRes = await extractColors(imageURL, { crossOrigin: 'Anonymous' })

  if (colorRes.length === 1) {
    const finalColors = await extractColors(imageURL, { crossOrigin: 'Anonymous', distance: 0 })
    return finalColors
  } else {
    return colorRes
  }
}
