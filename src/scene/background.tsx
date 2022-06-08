import { useFrame } from '@react-three/fiber'
import { CustomMaterial } from './shaders/bgShader'
import { button, useControls } from 'leva'
import { useMemo, useRef } from 'react'
import { BackSide, BoxBufferGeometry, DoubleSide, Vector2 } from 'three'
import { BackgroundProps } from '../types/types'
import { useAtom } from 'jotai'
import { bgValues } from '../lib/stores'

const Background = (colors: BackgroundProps) => {
  const albumColors = useMemo(() => {
    const filterHex = [...colors.colors].map((color) => {
      return color.hex
    })
    return filterHex
  }, [colors.colors])

  const [savedValues, setSavedValues] = useAtom(bgValues)

  const [{ lacunarity, gain, speed }, set] = useControls('Background', () => ({
    lacunarity: {
      value: savedValues.lacunarity,
      min: 0,
      max: 5,
      onChange: (value) => {
        setSavedValues({ ...savedValues, lacunarity: value })
      },
      transient: false,
    },
    gain: {
      value: savedValues.gain,
      min: 0,
      max: 1,
      onChange: (value) => {
        setSavedValues({ ...savedValues, gain: value })
      },
      transient: false,
    },
    speed: {
      value: savedValues.speed,
      min: 0,
      max: 5,
      onChange: (value) => {
        setSavedValues({ ...savedValues, speed: value })
      },
      transient: false,
    },
  }))

  const resetButton = useControls('Reset', () => ({
    // load the default values from object
    'Reset Settings': button(() => set({ speed: 0.35, lacunarity: 0.75, gain: 0.3 })),
  }))

  const mRef = useRef<any>()
  const gRef = useRef<BoxBufferGeometry>(null!)

  useFrame((state, delta) => {
    if (mRef.current) {
      mRef.current.u_time = state.clock.getElapsedTime()
    }
  })

  if (albumColors.length > 0) {
    return (
      <mesh>
        <boxBufferGeometry ref={gRef} args={[10, 10, 10]} />
        <customMaterial
          col1={albumColors[0]}
          col2={albumColors[1]}
          col3={albumColors[2]}
          col4={albumColors[3]}
          lacunarity={lacunarity}
          gain={gain}
          speed_mult={speed}
          u_resolution={new Vector2(window.innerWidth, window.innerHeight)}
          side={BackSide}
          ref={mRef}
          key={CustomMaterial.key}
        />
      </mesh>
    )
  }
  return null
}

export default Background
