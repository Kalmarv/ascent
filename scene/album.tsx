import { useRef } from 'react'
import { TextureLoader } from 'three'
import { useLoader } from '@react-three/fiber'
import { AlbumProps } from '../types/types'

const Album = ({ cover, ...props }: AlbumProps) => {
  const mesh = useRef<THREE.Mesh>(null!)
  const albumCover = useLoader(TextureLoader, cover)
  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={albumCover} />
    </mesh>
  )
}

export default Album