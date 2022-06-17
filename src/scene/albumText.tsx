import { MeshDistortMaterial, Text } from '@react-three/drei'
import { Suspense, useMemo } from 'react'
import { useSettings } from '../lib/stores'
import { Colors } from '../types/types'

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

  const distortion = useSettings((state) => state.distortion)
  const textSpeed = useSettings((state) => state.textSpeed)
  const fontSize = useSettings((state) => state.fontSize)
  const textCutoff = useSettings((state) => state.textCutoff)

  return (
    <Suspense fallback={null}>
      <Text
        position={[0, 0, -0.5]}
        fontSize={fontSize}
        lineHeight={1.2}
        letterSpacing={0.05}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        // @ts-ignore
        sdfGlyphSize={128}
        glyphGeometryDetail={64}
        maxWidth={textCutoff}
        textAlign="left"
        anchorX={'left'}
        rotation-y={-Math.PI / 9}
      >
        {`${title}\n${artist}`}
        <MeshDistortMaterial speed={textSpeed} distort={distortion} color={albumColors[3]?.hex || '#ffffff'} />
      </Text>
      <Text
        position={[0.013, -0.013, -0.513]}
        fontSize={fontSize}
        lineHeight={1.2}
        letterSpacing={0.05}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        // @ts-ignore
        sdfGlyphSize={128}
        glyphGeometryDetail={64}
        maxWidth={textCutoff}
        textAlign="left"
        anchorX={'left'}
        rotation-y={-Math.PI / 9}
      >
        {`${title}\n${artist}`}
        <MeshDistortMaterial speed={textSpeed} distort={distortion} color={albumColors[0]?.hex || '#000000'} />
      </Text>
    </Suspense>
  )
}

export default AlbumText
