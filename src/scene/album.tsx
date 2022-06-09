import { useRef } from 'react'
import { TextureLoader } from 'three'
import { useLoader } from '@react-three/fiber'
import { AlbumProps } from '../types/types'

const Album = ({ cover, ...props }: AlbumProps) => {
  const mesh = useRef<THREE.Mesh>(null!)
  const albumCover = useLoader(TextureLoader, cover)

  // For the life of me I couldn't figure out how to use different
  // materials for different faces of the cube.
  return (
    <>
      <mesh ref={mesh} scale={[1, 1, 1]}>
        <planeBufferGeometry />
        <meshStandardMaterial map={albumCover} />
      </mesh>
      <mesh position={[0, 0, -0.014]} scale={[1, 1, 0.025]}>
        <boxBufferGeometry />
        <meshBasicMaterial color="#121212" />
      </mesh>
    </>
  )
}

export default Album
