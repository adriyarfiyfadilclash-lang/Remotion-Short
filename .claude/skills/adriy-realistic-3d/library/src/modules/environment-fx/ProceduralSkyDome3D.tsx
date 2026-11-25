import React from "react";

type Props = { topColor?: string; horizonColor?: string; radius?: number };

/** Lightweight two-tone sky dome. Use BackSide so the inside is visible. */
export const ProceduralSkyDome3D: React.FC<Props> = ({ topColor = "#101d36", horizonColor = "#657b91", radius = 80 }) => (
  <mesh scale={radius}>
    <sphereGeometry args={[1, 32, 20]} />
    <shaderMaterial
      side={1}
      depthWrite={false}
      uniforms={{ topColor: { value: topColor }, horizonColor: { value: horizonColor } }}
      vertexShader={`varying vec3 vPosition; void main(){ vPosition = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`}
      fragmentShader={`uniform vec3 topColor; uniform vec3 horizonColor; varying vec3 vPosition; void main(){ float h = smoothstep(-0.15,0.85,vPosition.y); gl_FragColor = vec4(mix(horizonColor,topColor,h),1.0); }`}
    />
  </mesh>
);
