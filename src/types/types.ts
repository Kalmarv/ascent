import { MeshProps } from '@react-three/fiber'
import { FlowMaterial } from '../scene/shaders/flowShader'
import { MaterialNode } from '@react-three/fiber'
import { TunnelMaterial } from '../scene/shaders/tunnelShader'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      flowMaterial: MaterialNode<any, typeof FlowMaterial>
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      tunnelMaterial: MaterialNode<any, typeof TunnelMaterial>
    }
  }
}

export interface APIErrorResponse {
  message: string
}

export interface LastFmResponse {
  recenttracks: Recenttracks
  message?: string
  error?: number
}

export interface Recenttracks {
  track: Track[]
  '@attr': Attr2
}

export interface Track {
  artist: Artist
  streamable: string
  image: Image[]
  mbid: string
  album: Album
  name: string
  '@attr'?: Attr
  url: string
  date?: Date
}

export interface Artist {
  mbid: string
  '#text': string
}

export interface Image {
  size: string
  '#text': string
}

export interface Album {
  mbid: string
  '#text': string
}

export interface Attr {
  nowplaying: string
}

export interface Date {
  uts: string
  '#text': string
}

export interface Attr2 {
  user: string
  totalPages: string
  page: string
  perPage: string
  total: string
}

export interface lastFmData {
  artist: string
  track: string
  album: string
  image: string
  url: string
}

export interface lastFmSongProps {
  song: lastFmData
}

export interface AlbumProps extends MeshProps {
  cover: string
}

export interface Colors {
  /**
   * Color in hexadecimal string
   * @example '#62342b'
   */
  hex: string
  /**
   * Red canal from 0 to 255
   * @example 98
   */
  red: number
  /**
   * Green canal from 0 to 255
   * @example 52
   */
  green: number
  /**
   * Blue canal from 0 to 255
   * @example 43
   */
  blue: number
  /**
   * Area of the color and his neighbouring colors from 0 to 1
   * @example 0.5915
   */
  area: number
  /**
   * Color saturation from 0 to 1
   * @example 0.2156862
   */
  saturation: number
}

export interface BackgroundProps extends MeshProps {
  colors: Colors[]
}
