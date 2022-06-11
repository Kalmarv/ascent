import { atomWithStorage } from 'jotai/utils'
import { defaultFlowValues, defaultShaderSelection, defaultTunnelValues } from './constants'

export const bgValues = atomWithStorage('bgValues', {
  ...defaultFlowValues,
  ...defaultTunnelValues,
  ...defaultShaderSelection,
})
