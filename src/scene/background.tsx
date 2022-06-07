import { useFrame } from '@react-three/fiber'
import { CustomMaterial } from './shaders/bgShader'
import { useControls } from 'leva'
import { useRef } from 'react'
import { BackSide, BoxBufferGeometry, DoubleSide, Vector2 } from 'three'

const Background = () => {
  const { col1, col2, col3, col4, lacunarity, gain, speed_mult } = useControls({
    col1: {
      value: '#ff0000',
    },
    col2: {
      value: '#00ff00',
    },
    col3: {
      value: '#0000ff',
    },
    col4: {
      value: '#ffffff',
    },
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
    // Update material
    mRef.current.u_time = state.clock.getElapsedTime()
  })

  return (
    <mesh>
      <boxBufferGeometry ref={gRef} args={[10, 10, 10]} />
      <customMaterial
        col1={col1}
        col2={col2}
        col3={col3}
        col4={col4}
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

export default Background
