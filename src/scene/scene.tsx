import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Colors, lastFmSongProps } from '../types/types'
import Album from './album'
import { useEffect, useMemo, useState } from 'react'
import { getColors } from '../lib/getColors'
import Background from './background'
import { expandCols } from '../lib/expandColors'
import AlbumText from './albumText'

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
    <Canvas style={{ height: '100vh' }}>
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
