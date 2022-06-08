import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { Colors, lastFmSongProps } from '../types/types'
import Album from './album'
import { useEffect, useMemo, useState } from 'react'
import { getColors } from '../lib/getColors'
import Background from './background'
import { expandCols } from '../lib/expandColors'

const Scene: React.FC<lastFmSongProps> = ({ song }) => {
  const [songColors, setSongColors] = useState<Colors[]>([])

  useEffect(() => {
    getColors(song.image).then((extractedColors) => setSongColors(expandCols(extractedColors, 4)))
  }, [song.image])

  // sometimes the lastfm cdn returns a blank image
  // this stops it from recreating the album with a blank image
  useMemo(() => {
    return song
  }, [song])

  return (
    <Canvas
      style={{
        height: '100vh',
        // background: `linear-gradient(to bottom right, ${songColors[0]?.hex}, ${songColors[1]?.hex})`,
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[-10, -10, -10]} />
      <Album cover={song.image} scale={[1, 1, 0.05]} />
      <Background colors={songColors} />
      <OrbitControls />
      <Environment preset={'dawn'} />
    </Canvas>
  )
}

export default Scene
