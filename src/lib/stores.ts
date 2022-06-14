import { atomWithStorage } from 'jotai/utils'
import {
  defaultFlowValues,
  defaultShaderSelection,
  defaultSpeedValues,
  defaultTextValues,
  defaultTunnelValues,
} from './constants'

export const backgroundOptions = atomWithStorage('backgroundOptions', {
  ...defaultFlowValues,
  ...defaultTunnelValues,
  ...defaultSpeedValues,
})

export const textOptions = atomWithStorage('textOptions', {
  ...defaultTextValues,
})

export const guiOptions = atomWithStorage('guiOptions', defaultShaderSelection)
