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
  lacunarity: defaultSceneSettings.lacunarity,
  textCutoff: defaultSceneSettings.textCutoff,
  distortion: defaultSceneSettings.distortion,
  thickness: defaultSceneSettings.thickness,
  textSpeed: defaultSceneSettings.textSpeed,
  fontSize: defaultSceneSettings.fontSize,
  ridges: defaultSceneSettings.ridges,
  scale: defaultSceneSettings.scale,
  shape: defaultSceneSettings.shape,
  gain: defaultSceneSettings.gain,
  glow: defaultSceneSettings.glow,
  step: defaultSceneSettings.step,
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
    setLacunarity: (v: number) => set(() => ({ lacunarity: v })),
    setTextCutoff: (v: number) => set(() => ({ textCutoff: v })),
    setDistortion: (v: number) => set(() => ({ distortion: v })),
    setThickness: (v: number) => set(() => ({ thickness: v })),
    setTextSpeed: (v: number) => set(() => ({ textSpeed: v })),
    setFontSize: (v: number) => set(() => ({ fontSize: v })),
    setRidges: (v: number) => set(() => ({ ridges: v })),
    setScale: (v: number) => set(() => ({ scale: v })),
    setShape: (v: number) => set(() => ({ shape: v })),
    setGain: (v: number) => set(() => ({ gain: v })),
    setGlow: (v: number) => set(() => ({ glow: v })),
    setStep: (v: number) => set(() => ({ step: v })),
  }))
)
