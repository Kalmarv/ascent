import { atomWithStorage } from 'jotai/utils'
import { defaultFlowValues, defaultShaderSelection, defaultSpeedValues, defaultTunnelValues } from './constants'

export const levaOptions = atomWithStorage('levaOptions', {
  ...defaultFlowValues,
  ...defaultTunnelValues,
  ...defaultSpeedValues,
})

export const guiOptions = atomWithStorage('guiOptions', defaultShaderSelection)
