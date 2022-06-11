import { atomWithStorage } from 'jotai/utils'
import { defaultBGValues, defaultShaderValues } from './constants'

export const bgValues = atomWithStorage('bgValues', { ...defaultBGValues, ...defaultShaderValues })
