import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import * as THREE from 'three'

export const CustomMaterial = shaderMaterial(
  // Uniforms
  {
    u_resolution: new THREE.Vector2(0, 0),
    col1: new THREE.Color(0x000000),
    col2: new THREE.Color(0x000000),
    col3: new THREE.Color(0x000000),
    col4: new THREE.Color(0x000000),
    u_time: 0,
    lacunarity: 0,
    gain: 0,
    speed_mult: 0,
  },
  // Vertex Shader
  // "uv" is accessible globally inside the Vertex Shader
  `
varying vec2 vUv;

void main() {

  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
  `,
  // Fragment Shader
  `
precision mediump float;

uniform vec2 u_resolution;
uniform vec3 col1;
uniform vec3 col2;
uniform vec3 col3;
uniform vec3 col4;
uniform float u_time;
uniform float lacunarity;
uniform float gain;
uniform float speed_mult;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }

vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }

vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise2(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                      -0.577350269189626, // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
                                          // First corner
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);

  // Other corners
  vec2 i1;
  // i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
  // i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;
  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  // Permutations
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p =
      permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));

  vec3 m = max(
      0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;

  // Gradients: 41 points uniformly over a line, mapped onto a diamond.
  // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  // Normalise gradients implicitly by scaling m
  // Approximation of: m *= inversesqrt( a0*a0 + h*h );
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

  // Compute final noise value at P
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

#define OCTAVES 6

// Ridged multifractal
// See "Texturing & Modeling, A Procedural Approach", Chapter 12
float ridge(float h, float offset) {
  h = abs(h);     // create creases
  h = offset - h; // invert so creases are at top
  h = h * h;      // sharpen creases
  return h;
}

mat4 rotationMatrix(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;

  return mat4(
      oc * axis.x * axis.x + c, oc * axis.x * axis.y - axis.z * s,
      oc * axis.z * axis.x + axis.y * s, 0.0, oc * axis.x * axis.y + axis.z * s,
      oc * axis.y * axis.y + c, oc * axis.y * axis.z - axis.x * s, 0.0,
      oc * axis.z * axis.x - axis.y * s, oc * axis.y * axis.z + axis.x * s,
      oc * axis.z * axis.z + c, 0.0, 0.0, 0.0, 0.0, 1.0);
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
  mat4 m = rotationMatrix(axis, angle);
  return (m * vec4(v, 1.0)).xyz;
}

float ridgedMF(vec2 p) {
  float offset = 0.9;

  float sum = 0.0;
  float freq = 1.0, amp = 0.5;
  float prev = 1.0;
  for (int i = 0; i < OCTAVES; i++) {
    float n = ridge(snoise2(p * freq), offset);
    sum += n * amp;
    sum += n * amp * prev; // scale by previous octave
    prev = n;
    freq *= lacunarity;
    amp *= gain;
  }
  return sum;
}

float fbm(in vec2 st) {
  // Initial values
  float value = 0.0;
  float amplitude = .5;
  float frequency = 0.;
  // Loop of OCTAVES
  float prev = 1.0;
  for (int i = 0; i < OCTAVES; i++) {
    value += amplitude * abs(snoise2(st));
    st *= lacunarity;
    amplitude *= gain;
  }
  return value;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st.x *= u_resolution.x / u_resolution.y;

  vec3 color = vec3(0.0);

  vec2 q = vec2(0.);
  q.x = fbm(st + 0.1 * u_time * speed_mult);
  q.y = fbm(st + vec2(1.0));

  vec2 r = vec2(0.);
  r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * u_time * speed_mult);
  r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * u_time * speed_mult);

  float f = fbm(st + r);

  color = mix(vec3(col4), vec3(col2), clamp((f * f) * 4.0, 0.0, 1.0));

  color = mix(color, col3, clamp(length(q), 0.0, 1.0));

  color = mix(color, col1, clamp(length(r.x), 0.0, 1.0));

  gl_FragColor = vec4(color, 1.0);
}
  `
)

extend({ CustomMaterial })
