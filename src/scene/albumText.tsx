import { Suspense, useMemo } from 'react'
import { Colors } from '../types/types'
import { MeshDistortMaterial, Text } from '@react-three/drei'

const AlbumText = ({ title, artist, colors }: { title: string; artist: string; colors: Colors[] }) => {
  const albumColors = useMemo(() => {
    const filterHex = [...colors]
      .map((color) => {
        // approximate the brightness of the color and sort for good contrast
        const brightness = (color.red + color.red + color.blue + color.green + color.green + color.green) / 6
        return { hex: color.hex, brightness: brightness }
      })
      .sort((a, b) => a.brightness - b.brightness)
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
        textAlign="left"
        anchorX={'left'}
      >
        {`${title}\n${artist}`}
        <MeshDistortMaterial speed={1} distort={0.3} color={albumColors[3]?.hex || '#ffffff'} />
      </Text>
      <Text
        position={[0.763, -0.013, -0.013]}
        fontSize={0.15}
        lineHeight={1.2}
        letterSpacing={0.05}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        // @ts-ignore
        sdfGlyphSize={128}
        glyphGeometryDetail={64}
        maxWidth={2}
        textAlign="left"
        anchorX={'left'}
      >
        {`${title}\n${artist}`}
        <MeshDistortMaterial speed={1} distort={0.3} color={albumColors[0]?.hex || '#000000'} />
      </Text>
    </Suspense>
  )
}

export default AlbumText
