import { useFrame } from '@react-three/fiber'
import { FlowMaterial } from './shaders/flowShader'
import { TunnelMaterial } from './shaders/tunnelShader'
import { button, useControls } from 'leva'
import { useEffect, useMemo, useRef } from 'react'
import { BackSide, BoxBufferGeometry, DoubleSide, Vector2 } from 'three'
import { BackgroundProps } from '../types/types'
import { useAtom } from 'jotai'
import { levaOptions, guiOptions } from '../lib/stores'
import { defaultFlowValues, defaultShaderSelection, defaultSpeedValues, defaultTunnelValues } from '../lib/constants'

const Background = (colors: BackgroundProps) => {
  const albumColors = useMemo(() => {
    const filterHex = [...colors.colors].map((color) => {
      return color.hex
    })
    return filterHex
  }, [colors.colors])

  const [savedValues, setSavedValues] = useAtom(levaOptions)
  const [selectedShader, setSelectedShader] = useAtom(guiOptions)

  const [{ lacunarity, gain, ridges }, setFlow] = useControls('Flow', () => ({
    lacunarity: { value: savedValues.lacunarity, min: 0, max: 5 },
    gain: { value: savedValues.gain, min: 0, max: 1 },
    ridges: { value: savedValues.ridges, min: 50, max: 500 },
  }))

  const [{ glow, step, shape, scale, thickness }, setTunnel] = useControls('Tunnel', () => ({
    glow: { value: savedValues.glow, min: 0, max: 1 },
    step: { value: savedValues.step, min: 0, max: 15 },
    shape: { value: savedValues.shape, min: 0, max: 2 },
    scale: { value: savedValues.scale, min: 0, max: 20 },
    thickness: { value: savedValues.thickness, min: 0, max: 0.1 },
  }))

  const [{ speed }, setSpeed] = useControls('Speed', () => ({
    speed: { value: savedValues.speed, min: 0, max: 5 },
  }))

  const resetButton = useControls('Reset', () => ({
    'Reset Settings': button(() => {
      setSelectedShader({ ...selectedShader, ...defaultShaderSelection })
      setFlow(defaultFlowValues)
      setSpeed(defaultSpeedValues)
      setTunnel(defaultTunnelValues)
    }),
  }))

  // yeah idk, I spend 5 hours on this and no progress
  // check out the values in local storage changing,
  // this is what is setting the vales back to what they actually are
  // this might actually be better though
  useEffect(() => {
    setSavedValues({
      ...savedValues,
      lacunarity: lacunarity,
      gain: gain,
      ridges: ridges,
      speed: speed,
      glow: glow,
      step: step,
      shape: shape,
      scale: scale,
      thickness: thickness,
    })
  }, [lacunarity, gain, speed, glow, step, shape, scale, thickness, setSavedValues, savedValues, ridges])

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
        {selectedShader.background === 'flow' ? (
          <flowMaterial
            col1={albumColors[0]}
            col2={albumColors[1]}
            col3={albumColors[2]}
            col4={albumColors[3]}
            lacunarity={lacunarity}
            gain={gain}
            ridges={ridges}
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
