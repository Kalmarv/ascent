import create from 'zustand'
import { combine } from 'zustand/middleware'

interface PaneExistence {
  paneExists: boolean
  setPaneExists: (v: boolean) => void
}

export const usePlsStopRerendering = create<PaneExistence>((set) => ({
  paneExists: false,
  setPaneExists: (v: boolean) => set(() => ({ paneExists: v })),
}))

type defaultSettings = {
  shaderSpeed: number
}

const defaultState = () =>
  ({
    shaderSpeed: 0.35,
  } as defaultSettings)

const loadSettings = () => {
  const stored = localStorage.getItem('sceneSettings')
  if (stored) {
    const result = JSON.parse(stored) as Partial<defaultSettings>
    return { ...defaultState(), ...result }
  }
  return defaultState()
}

export const useSettings = create(
  combine(loadSettings(), (set) => ({
    setShaderSpeed: (v: number) => set(() => ({ shaderSpeed: v })),
    resetShaderSpeed: () => set(() => ({ shaderSpeed: 0.35 })),
  }))
)
