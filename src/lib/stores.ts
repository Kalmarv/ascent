import { atomWithStorage } from 'jotai/utils'
import { defaultFlowValues, defaultShaderSelection, defaultTunnelValues } from './constants'

export const levaOptions = atomWithStorage('levaOptions', {
  ...defaultFlowValues,
  ...defaultTunnelValues,
})

export const guiOptions = atomWithStorage('guiOptions', defaultShaderSelection)
