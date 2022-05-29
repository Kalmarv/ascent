import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { Colors, lastFmSongProps } from '../types/types'
import Album from './album'
import { useEffect, useState } from 'react'
import { getColors } from '../lib/getColors'

const Scene: React.FC<lastFmSongProps> = ({ song }) => {
  const [songColors, setSongColors] = useState<Colors[]>([])

  useEffect(() => {
    getColors(song.image).then((extractedColors) => setSongColors(extractedColors))
  }, [song.image])

  return (
    <Canvas style={{ height: '100vh' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[-10, -10, -10]} />
      <Album cover={song.image} scale={[1, 1, 0.05]} />
      <OrbitControls />
      <Environment preset={'dawn'} />
    </Canvas>
  )
}

export default Scene