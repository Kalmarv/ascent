import { extend, useFrame } from '@react-three/fiber'
import { CustomMaterial } from './shaders/bgShader'
import { useControls } from 'leva'
import { useRef } from 'react'
import { DoubleSide, PlaneBufferGeometry, Vector2 } from 'three'

extend({ CustomMaterial })

const Plain = () => {
  const { x, y } = useControls({
    x: {
      value: 15,
      min: 0,
      max: 20,
      step: 0.01,
    },
    y: {
      value: 10,
      min: 0,
      max: 20,
      step: 0.01,
    },
  })
  const mRef = useRef<any>()
  const gRef = useRef<PlaneBufferGeometry>(null!)

  useFrame((state, delta) => {
    // Update material
    mRef.current.uTime = state.clock.getElapsedTime()
  })

  return (
    <mesh>
      <planeBufferGeometry ref={gRef} args={[1, 1, 32, 32]} />
      <customMaterial side={DoubleSide} uFrequency={new Vector2(x, y)} ref={mRef} key={CustomMaterial.key} />
    </mesh>
  )
}

const Background = () => {
  return <Plain />
}

export default Background
