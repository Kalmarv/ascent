import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import * as THREE from 'three'

export const TunnelMaterial = shaderMaterial(
  // Uniforms
  {
    u_resolution: new THREE.Vector2(0, 0),
    col1: new THREE.Color(0x000000),
    col2: new THREE.Color(0x000000),
    col3: new THREE.Color(0x000000),
    col4: new THREE.Color(0x000000),
    u_time: 0,
    speed_mult: 0,
    glow: 0,
    noise_step: 0,
    noise_shape: 0,
    noise_scale: 0,
    thickness: 0,
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
uniform float speed_mult;
uniform float glow;
uniform float noise_step;
uniform float noise_shape;
uniform float noise_scale;
uniform float thickness;

vec3 hash3(vec2 p) {
  vec3 q = vec3(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)),
                dot(p, vec2(419.2, 371.9)));
  return fract(sin(q) * 43758.5453);
}

// iq voronoise
float iqnoise(in vec2 x, float u, float v) {
  vec2 p = floor(x);
  vec2 f = fract(x);

  float k = 1.0 + 63.0 * pow(1.0 - v, 4.0);

  float va = 0.0;
  float wt = 0.0;
  for (int j = -2; j <= 2; j++)
    for (int i = -2; i <= 2; i++) {
      vec2 g = vec2(float(i), float(j));
      vec3 o = hash3(p + g) * vec3(u, u, 1.0);
      vec2 r = g - f + o.xy;
      float d = dot(r, r);
      float ww = pow(1.0 - smoothstep(0.0, 1.414, sqrt(d)), k);
      va += o.z * ww;
      wt += ww;
    }

  return va / wt;
}

// iq palette
vec3 palette(in float t) {
  float step1 = 0.2;
  float step2 = 0.3333;
  float step3 = 0.4666;
  float step4 = 0.6;

  vec3 color = mix(col1, col2, smoothstep(step1, step2, t));
  color = mix(color, col3, smoothstep(step2, step3, t));
  color = mix(color, col4, smoothstep(step3, step4, t));

  return vec3(color);
}

float sin01(in float t) { return (sin(t) + 1.) * 0.5; }

void main() {
  vec2 point = gl_FragCoord.xy / u_resolution.xy;
  // vec2 mouse = (mouse.xy - 0.5) * 0.1; mouse is kind of ugly?
  vec2 center = vec2(0.5 - (sin(u_time * speed_mult * 0.5) * 0.05),
                     0.5 - (sin(u_time * speed_mult * 0.25) * 0.1));

  // aspect ratio
  float aspect = u_resolution.x / u_resolution.y;
  point.x *= aspect;
  center.x *= aspect;

  // center circle
  float circle = pow(smoothstep(0.3, 0., length(point - center)), 1.2) * 0.55;

  // circle glow
  float glow = pow(smoothstep(1.4, 0.2, length(point - center)), 1.2) * glow;

  // planar distortion
  float rInv = 1. / length(point - center);
  point = point * rInv - vec2(rInv, 0.0);

  // sample noise
  vec2 uv = vec2(point.x, point.y + u_time * speed_mult * 0.5) * noise_scale;
  float noise = iqnoise(uv, 0.5, noise_shape);
  float stepNoise = floor(noise * 10.3) /
                    noise_step; // stepping irregularly gives nice shapes

  // draw outline around stepped noise
  float outline =
      1.0 - step(smoothstep(stepNoise - thickness, stepNoise, noise) -
                     (smoothstep(stepNoise, stepNoise + thickness, noise)),
                 thickness);
  vec3 outlineCol = outline * palette(sin01(u_time * speed_mult * 1.0));

  // get tunnel color from palette. I tried directly attenuating this by length
  // of the fragment but it kept blowing out to white
  vec3 palette =
      palette((stepNoise * 0.5) + sin01(u_time * speed_mult * 2.0) * 0.2);

  // combine
  vec3 finalColor = palette + outlineCol + circle + glow;
  // finalColor = vec3(glow + circle);
  gl_FragColor = vec4(finalColor, 1.0);
}
  `
)

extend({ TunnelMaterial })
