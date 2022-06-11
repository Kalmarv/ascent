import { useFrame } from '@react-three/fiber'
import { FlowMaterial } from './shaders/flowShader'
import { TunnelMaterial } from './shaders/tunnelShader'
import { button, useControls } from 'leva'
import { useMemo, useRef } from 'react'
import { BackSide, BoxBufferGeometry, DoubleSide, Vector2 } from 'three'
import { BackgroundProps } from '../types/types'
import { useAtom } from 'jotai'
import { bgValues } from '../lib/stores'
import { defaultBGValues, defaultShaderValues } from '../lib/constants'

const Background = (colors: BackgroundProps) => {
  const albumColors = useMemo(() => {
    const filterHex = [...colors.colors].map((color) => {
      return color.hex
    })
    return filterHex
  }, [colors.colors])

  const [savedValues, setSavedValues] = useAtom(bgValues)

  const [{ lacunarity, gain, speed }, setFlow] = useControls('Flow', () => ({
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
    'Reset Settings': button(() => {
      setSavedValues({ ...savedValues, ...defaultShaderValues })
      setFlow(defaultBGValues)
    }),
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
        {savedValues.background === 'flow' ? (
          <flowMaterial
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
            key={FlowMaterial.key}
          />
        ) : (
          <tunnelMaterial
            col1={albumColors[0]}
            col2={albumColors[1]}
            col3={albumColors[2]}
            col4={albumColors[3]}
            speed_mult={speed}
            glow={-0.25}
            noise_step={11.0}
            noise_shape={1.2}
            noise_scale={1.7}
            thickness={0.3}
            u_resolution={new Vector2(window.innerWidth, window.innerHeight)}
            side={BackSide}
            ref={mRef}
            key={TunnelMaterial.key}
          />
        )}
      </mesh>
    )
  }
  return null
}

export default Background
