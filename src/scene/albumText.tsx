import { Suspense, useMemo } from 'react'
import { Colors } from '../types/types'
import { Text } from '@react-three/drei'

const AlbumText = ({ title, artist, colors }: { title: string; artist: string; colors: Colors[] }) => {
  const albumColors = useMemo(() => {
    const filterHex = [...colors].map((color) => {
      return color.hex
    })
    return filterHex
  }, [colors])

  return (
    <Suspense fallback={null}>
      <Text
        position={[0.75, 0, 0]}
        fontSize={0.15}
        lineHeight={1.2}
        letterSpacing={0.05}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        // @ts-ignore
        sdfGlyphSize={128}
        glyphGeometryDetail={64}
        maxWidth={2}
        // outlineColor={albumColors[1]}
        // outlineWidth={0.005}
        textAlign="left"
        anchorX={'left'}
      >
        {`${title}\n${artist}`}
        <meshBasicMaterial color={albumColors[0]} />
      </Text>
    </Suspense>
  )
}

export default AlbumText
