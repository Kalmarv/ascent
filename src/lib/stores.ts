import create from 'zustand'
import { combine } from 'zustand/middleware'

interface PaneExistence {
  paneExists: boolean
  setPaneExists: (v: boolean) => void
}

export const usePlsStopRerendering = create<PaneExistence>((set) => ({
  paneExists: false,
  setPaneExists: () => set({ paneExists: true }),
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
    resetToDefault: () => set(defaultState()),
    setShaderSpeed: (v: number) => set(() => ({ shaderSpeed: v })),
  }))
)
