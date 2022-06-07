import { useFrame } from '@react-three/fiber'
import { CustomMaterial } from './shaders/bgShader'
import { useControls } from 'leva'
import { useMemo, useRef } from 'react'
import { BackSide, BoxBufferGeometry, DoubleSide, Vector2 } from 'three'
import { BackgroundProps } from '../types/types'

const Background = (colors: BackgroundProps) => {
  const albumColors = useMemo(() => {
    const filterHex = [...colors.colors].map((color) => {
      return color.hex
    })
    return filterHex
  }, [colors.colors])

  const { lacunarity, gain, speed_mult } = useControls({
    lacunarity: {
      value: 0.5,
    },
    gain: {
      value: 0.5,
    },
    speed_mult: {
      value: 0.5,
    },
  })
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
          speed_mult={speed_mult}
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
