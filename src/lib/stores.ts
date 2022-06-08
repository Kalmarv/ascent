import { atomWithStorage } from 'jotai/utils'

export const bgValues = atomWithStorage('bgValues', {
  lacunarity: 0.75,
  gain: 0.3,
  speed: 0.35,
})
