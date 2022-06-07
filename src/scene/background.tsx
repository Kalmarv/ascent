// import { useFrame, useThree } from '@react-three/fiber'
// import { useRef } from 'react'
// import { BackSide, Color, Mesh } from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef } from 'react'

// const Background = () => {
//   const mesh = useRef<THREE.Mesh>(null!)
//   const { clock } = useThree()
//   const shaderValues = useControls({ time: { value: 0.0 } })

//   const uniforms = {
//     time: { value: 0.0 },
//     // color: { value: new Color(1.0, 0.0, 1.0) },
//   }

//   useFrame(() => {
//     if (mesh.current) {
//       uniforms.time.value = clock.getElapsedTime()
//     }
//   })

//   const { time } = useControls({
//     time: { value: 0.3, min: 0, max: 200 },
//   })

//   return (
//     <mesh ref={mesh}>
//       <boxGeometry args={[10, 10, 10]} />
//       <shaderMaterial
//         uniforms={{time: time}}
//         side={BackSide}
//         vertexShader={vertexShader}
//         fragmentShader={fragmentShader}
//       ></shaderMaterial>
//     </mesh>
//   )
// }

// export default Background

import { WaveMaterial } from './shaders/bgShader'

const Background = () => {
  const ref = useRef()

  const { color } = useControls('Colors', {
    color: '#7d7bff',
  })

  const { width, height } = useThree((state) => state.viewport)
  useFrame((state, delta) => (ref.current.time += delta))

  return (
    <mesh scale={[width, height, 1]}>
      <planeGeometry args={[1, 1, 16, 16]} />
      {/* We use the materials module 🔑 to allow HMR replace */}
      <waveMaterial ref={ref} key={WaveMaterial.key} color={color} />
    </mesh>
  )
}

export default Background
