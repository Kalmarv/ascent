import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { lastFmSongProps } from '../types/types'
import Album from './album'
import { useEffect, useState } from 'react'
// the @types package was not really working
//@ts-ignore
import extractColors from 'extract-colors'

const getColors = async (imageURL: string) => {
  const colorRes = await extractColors(imageURL, { crossOrigin: 'Anonymous' })

  // if (colorRes.length === 1) {
  //   const finalColors = await extractColors(imageURL, { crossOrigin: 'Anonymous', distance: 0 })
  //   return finalColors
  // } else {
  return colorRes
  // }
}

const Scene: React.FC<lastFmSongProps> = ({ song }) => {
  const [songColors, setSongColors] = useState([])

  useEffect(() => {
    getColors(song.image).then((songColors) => console.log(songColors))
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
