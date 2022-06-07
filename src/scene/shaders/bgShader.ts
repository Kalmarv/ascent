import * as THREE from 'three'
import { extend } from '@react-three/fiber'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
const fragmentShader = `
uniform float time;
uniform vec3 color;
varying vec2 vUv;
void main() {
  gl_FragColor.rgba = vec4(color.xyz, 1.0);
}
`

class WaveMaterial extends THREE.ShaderMaterial {
  static key: number
  constructor() {
    super({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color('hotpink') },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })
  }

  set time(v) { this.uniforms.time.value = v } // prettier-ignore
  get time() { return this.uniforms.time.value } // prettier-ignore
  get color() { return this.uniforms.color.value } // prettier-ignore
}

// This is the 🔑 that HMR will renew if this file is edited
// It works for THREE.ShaderMaterial as well as for drei/shaderMaterial
WaveMaterial.key = 12378291732
// Make the material available in JSX as <waveMaterial />
extend({ WaveMaterial })
export { WaveMaterial }
