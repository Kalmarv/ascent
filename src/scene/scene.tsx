import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useMemo, useState } from 'react'
import { expandCols } from '../lib/expandColors'
import { getColors } from '../lib/getColors'
import { Colors, lastFmSongProps } from '../types/types'
import Album from './album'
import AlbumText from './albumText'
import Background from './background'

const Scene: React.FC<lastFmSongProps> = ({ song }) => {
  const [songColors, setSongColors] = useState<Colors[]>([])

  // don't want to run getColors every 5 seconds
  useMemo(() => {
    return song
  }, [song])

  useEffect(() => {
    getColors(song.image).then((extractedColors) => setSongColors(expandCols(extractedColors, 4)))
  }, [song.image])

  return (
    <Canvas style={{ height: '100vh' }} camera={{ fov: 50, position: [0, 0.1, 4] }}>
      {/* Tried to match the brightness to what I see visually in spotify */}
      <ambientLight intensity={0.8} />
      <Album cover={song.image} />
      <Background colors={songColors} />
      <AlbumText title={song.track} artist={song.artist} colors={songColors} />
      <OrbitControls />
    </Canvas>
  )
}

export default Scene
