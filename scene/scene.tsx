import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { lastFmSongProps } from '../lib/types'
import Album from './album'

const Scene: React.FC<lastFmSongProps> = ({ song }) => {
  return (
    <Canvas style={{ height: '100vh' }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      {/* FIXME: types */}
      <Album cover={song.image} position={[0, 0, 0]} />
      <OrbitControls />
      <Environment preset={'dawn'} />
    </Canvas>
  )
}

export default Scene
