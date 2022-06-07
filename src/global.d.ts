import { CustomMaterial } from './scene/shaders/bgShader'
import { MaterialNode } from '@react-three/fiber'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      customMaterial: MaterialNode<any, typeof CustomMaterial>
    }
  }
}
