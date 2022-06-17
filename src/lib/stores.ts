import create from 'zustand'
import { combine } from 'zustand/middleware'

type defaultSettings = {
  paneExist: boolean
}

const defaultState = () =>
  ({
    paneExist: false,
  } as defaultSettings)

const loadSettings = () => {
  return defaultState()
}

export const useSettings = create(
  combine(loadSettings(), (set) => ({
    setPaneExist: (paneExist: boolean) => set(() => ({ paneExist: true })),
  }))
)
