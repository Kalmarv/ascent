import { atomWithStorage } from 'jotai/utils'
import {
  defaultFlowValues,
  defaultShaderSelection,
  defaultSpeedValues,
  defaultTextValues,
  defaultTunnelValues,
} from './constants'

export const levaOptions = atomWithStorage('levaOptions', {
  ...defaultFlowValues,
  ...defaultTunnelValues,
  ...defaultSpeedValues,
  ...defaultTextValues,
})

export const guiOptions = atomWithStorage('guiOptions', defaultShaderSelection)
