import { useRef, useState } from 'react'
import { TextureLoader } from 'three'
import { useLoader } from '@react-three/fiber'
import { AlbumProps } from '../types/types'
import { useSpring, animated, config } from '@react-spring/three'
import { Float } from '@react-three/drei'

const Album = ({ cover, ...props }: AlbumProps) => {
  const mesh = useRef<THREE.Mesh>(null!)
  const albumCover = useLoader(TextureLoader, cover)
  const [hovered, hover] = useState(false)

  const { scale } = useSpring({
    scale: hovered ? 1.25 : 1,
    config: config.wobbly,
  })

  // For the life of me I couldn't figure out how to use different
  // materials for different faces of the cube.
  return (
    <>
      <Float floatIntensity={0.1} speed={2}>
        <animated.mesh
          ref={mesh}
          scale={scale}
          onPointerOver={(event) => hover(true)}
          onPointerOut={(event) => hover(false)}
        >
          <planeBufferGeometry />
          <meshStandardMaterial map={albumCover} />
        </animated.mesh>
        <animated.mesh
          position={[0, 0, -0.014]}
          onPointerOver={(event) => hover(true)}
          onPointerOut={(event) => hover(false)}
          // have to separate the axis to keep reactive spring values as well as fixed z-scale
          scale-x={scale}
          scale-y={scale}
          scale-z={0.025}
        >
          <boxBufferGeometry />
          <meshBasicMaterial color="#121212" />
        </animated.mesh>
      </Float>
    </>
  )
}

export default Album
