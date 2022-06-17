import { defaultSceneSettings } from './constants'
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

const defaultState = () => ({
  backgroundShader: defaultSceneSettings.backgroundShader,
  shaderSpeed: defaultSceneSettings.shaderSpeed,
  distortion: defaultSceneSettings.distortion,
  textSpeed: defaultSceneSettings.textSpeed,
  fontSize: defaultSceneSettings.fontSize,
  textCutoff: defaultSceneSettings.textCutoff,
  lacunarity: defaultSceneSettings.lacunarity,
  gain: defaultSceneSettings.gain,
  ridges: defaultSceneSettings.ridges,
  glow: defaultSceneSettings.glow,
  step: defaultSceneSettings.step,
  shape: defaultSceneSettings.shape,
  scale: defaultSceneSettings.scale,
  thickness: defaultSceneSettings.thickness,
})

const loadSettings = () => {
  const stored = localStorage.getItem('sceneSettings')
  if (stored) {
    const result = JSON.parse(stored)
    return { ...defaultState(), ...result }
  }
  return defaultState()
}

export const useSettings = create(
  combine(loadSettings(), (set) => ({
    reset: () => set(defaultState()),
    setBackgroundShader: (v: string) => set(() => ({ backgroundShader: v })),
    setShaderSpeed: (v: number) => set(() => ({ shaderSpeed: v })),
    setDistortion: (v: number) => set(() => ({ distortion: v })),
    setTextSpeed: (v: number) => set(() => ({ textSpeed: v })),
    setFontSize: (v: number) => set(() => ({ fontSize: v })),
    setTextCutoff: (v: number) => set(() => ({ textCutoff: v })),
    setLacunarity: (v: number) => set(() => ({ lacunarity: v })),
    setGain: (v: number) => set(() => ({ gain: v })),
    setRidges: (v: number) => set(() => ({ ridges: v })),
    setGlow: (v: number) => set(() => ({ glow: v })),
    setStep: (v: number) => set(() => ({ step: v })),
    setShape: (v: number) => set(() => ({ shape: v })),
    setScale: (v: number) => set(() => ({ scale: v })),
    setThickness: (v: number) => set(() => ({ thickness: v })),
  }))
)
