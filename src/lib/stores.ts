import create from 'zustand'
import { combine } from 'zustand/middleware'

type defaultSettings = {
  paneExist: boolean
  shaderSpeed: number
}

const defaultState = () =>
  ({
    paneExist: false,
    shaderSpeed: 0.35,
  } as defaultSettings)

const loadSettings = () => {
  return defaultState()
}

export const useSettings = create(
  combine(loadSettings(), (set) => ({
    setPaneExist: () => set(() => ({ paneExist: true })),
    setShaderSpeed: (v: number) => set(() => ({ shaderSpeed: v })),
  }))
)
