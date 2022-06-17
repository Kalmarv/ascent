import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import { BackSide, BoxBufferGeometry, Vector2 } from 'three'
import { useSettings } from '../lib/stores'
import { BackgroundProps } from '../types/types'
import { FlowMaterial } from './shaders/flowShader'
import { TunnelMaterial } from './shaders/tunnelShader'

const Background = (colors: BackgroundProps) => {
  const albumColors = useMemo(() => {
    const filterHex = [...colors.colors].map((color) => {
      return color.hex
    })
    return filterHex
  }, [colors.colors])

  const settings = useSettings()
  const shader = useSettings((state) => state.backgroundShader)
  const lacunarity = useSettings((state) => state.lacunarity)
  const gain = useSettings((state) => state.gain)
  const ridges = useSettings((state) => state.ridges)
  const glow = useSettings((state) => state.glow)
  const step = useSettings((state) => state.step)
  const shape = useSettings((state) => state.shape)
  const scale = useSettings((state) => state.scale)
  const thickness = useSettings((state) => state.thickness)

  const mRef = useRef<any>()
  const gRef = useRef<BoxBufferGeometry>(null!)
  const { shaderSpeed } = useSettings()

  useFrame((state, delta) => {
    if (mRef.current) {
      mRef.current.u_time = state.clock.getElapsedTime()
    }
  })

  if (albumColors.length > 0) {
    return (
      <mesh>
        <boxBufferGeometry ref={gRef} args={[10, 10, 10]} />
        {shader === 'flow' ? (
          <flowMaterial
            col1={albumColors[0]}
            col2={albumColors[1]}
            col3={albumColors[2]}
            col4={albumColors[3]}
            lacunarity={lacunarity}
            gain={gain}
            ridges={ridges}
            speed_mult={shaderSpeed}
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
            speed_mult={shaderSpeed}
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
