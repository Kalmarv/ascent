import { atomWithStorage } from 'jotai/utils'
import { defaultBGValues } from './constants'

export const bgValues = atomWithStorage('bgValues', defaultBGValues)
