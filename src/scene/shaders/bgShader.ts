import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

export const CustomMaterial = shaderMaterial(
  // Uniforms
  {
    uFrequency: new THREE.Vector2(10, 5),
    uTime: 0,
  },
  // Vertex Shader
  // "uv" is accessible globally inside the Vertex Shader
  `
  uniform vec2 uFrequency;
  uniform float uTime;

  varying float vModelPosition;
  varying vec2 vUv;

  void main()
  {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      modelPosition.z += sin(modelPosition.x * uFrequency.x + -uTime * 2.0) * 0.1;
      modelPosition.z += sin(modelPosition.y * uFrequency.y + -uTime * 2.0) * 0.1;

      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
  
      gl_Position = projectedPosition;

      vModelPosition = modelPosition.z;
      vUv = uv;
  }
  `,
  // Fragment Shader
  `
      precision mediump float;

      varying float vModelPosition;
      varying vec2 vUv;

      void main() {
        gl_FragColor = vModelPosition * vec4(0.5, 1.0, 0.0, 1.0) / 0.8 + 0.75;

        gl_FragColor = vec4(vUv, 1.0, 1.0);
      }
  `
)
