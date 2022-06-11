import { useFrame } from '@react-three/fiber'
import { FlowMaterial } from './shaders/flowShader'
import { TunnelMaterial } from './shaders/tunnelShader'
import { button, useControls } from 'leva'
import { useMemo, useRef } from 'react'
import { BackSide, BoxBufferGeometry, DoubleSide, Vector2 } from 'three'
import { BackgroundProps } from '../types/types'
import { useAtom } from 'jotai'
import { bgValues } from '../lib/stores'
import { defaultFlowValues, defaultShaderSelection, defaultTunnelValues } from '../lib/constants'

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

  const [{ glow, step, shape, scale, thickness }, setTunnel] = useControls('Tunnel', () => ({
    glow: {
      value: savedValues.glow,
      min: -1,
      max: 1,
      onChange: (value) => {
        setSavedValues({ ...savedValues, glow: value })
      },
      transient: false,
    },
    step: {
      value: savedValues.step,
      min: 0,
      max: 15,
      onChange: (value) => {
        setSavedValues({ ...savedValues, step: value })
      },
      transient: false,
    },
    shape: {
      value: savedValues.shape,
      min: 0,
      max: 2,
      onChange: (value) => {
        setSavedValues({ ...savedValues, shape: value })
      },
      transient: false,
    },
    scale: {
      value: savedValues.scale,
      min: 0,
      max: 20,
      onChange: (value) => {
        setSavedValues({ ...savedValues, scale: value })
      },
      transient: false,
    },
    thickness: {
      value: savedValues.thickness,
      min: 0,
      max: 0.1,
      onChange: (value) => {
        setSavedValues({ ...savedValues, thickness: value })
      },
      transient: false,
    },
  }))

  const resetButton = useControls('Reset', () => ({
    'Reset Settings': button(() => {
      setSavedValues({ ...savedValues, ...defaultShaderSelection })
      setFlow(defaultFlowValues)
      setTunnel(defaultTunnelValues)
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
            glow={glow}
            noise_step={step}
            noise_shape={shape}
            noise_scale={scale}
            thickness={thickness}
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
