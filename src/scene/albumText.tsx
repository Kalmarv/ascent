import { MeshDistortMaterial, Text } from '@react-three/drei'
import { useAtom } from 'jotai'
import { button, useControls } from 'leva'
import { Suspense, useEffect, useMemo } from 'react'
import { defaultTextValues } from '../lib/constants'
import { textOptions } from '../lib/stores'
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

  const [savedValues, setSavedValues] = useAtom(textOptions)

  const [{ distortion, textSpeed, fontSize }, setText] = useControls('Text', () => ({
    distortion: { value: savedValues.distortion, min: 0, max: 1 },
    textSpeed: { value: savedValues.textSpeed, min: 0, max: 5 },
    fontSize: { value: savedValues.fontSize, min: 0, max: 1 },
  }))

  const resetButton = useControls('Reset', () => ({
    'Reset Text': button(() => {
      setText(defaultTextValues)
    }),
  }))

  useEffect(() => {
    setSavedValues({
      ...savedValues,
      distortion: distortion,
      textSpeed: textSpeed,
      fontSize: fontSize,
    })
  }, [distortion, textSpeed, savedValues, setSavedValues, fontSize])

  return (
    <Suspense fallback={null}>
      <Text
        position={[0.75, 0, 0]}
        fontSize={fontSize}
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
        <MeshDistortMaterial speed={textSpeed} distort={distortion} color={albumColors[3]?.hex || '#ffffff'} />
      </Text>
      <Text
        position={[0.763, -0.013, -0.013]}
        fontSize={fontSize}
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
        <MeshDistortMaterial speed={textSpeed} distort={distortion} color={albumColors[0]?.hex || '#000000'} />
      </Text>
    </Suspense>
  )
}

export default AlbumText
