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

  const [selectedShader, setSelectedShader] = useState<string>('flow')
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
        {selectedShader === 'flow' ? (
          <flowMaterial
            col1={albumColors[0]}
            col2={albumColors[1]}
            col3={albumColors[2]}
            col4={albumColors[3]}
            lacunarity={1.0}
            gain={0.25}
            ridges={130}
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
            glow={0}
            noise_step={11.0}
            noise_shape={1.2}
            noise_scale={1.7}
            thickness={0.03}
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
