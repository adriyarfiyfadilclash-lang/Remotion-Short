import React from "react";
import { useCurrentFrame } from "remotion";
import * as THREE from "three";

export type NebulaVolumetricLightingProps = {
  position?: [number, number, number];
  colorA?: THREE.ColorRepresentation;
  colorB?: THREE.ColorRepresentation;
  intensity?: number;
  spread?: number;
};

/** Layered point lights that suggest colored nebula glow (not true volumetric scattering). */
export const NebulaVolumetricLighting: React.FC<NebulaVolumetricLightingProps> = ({
  position = [0, 0, -8], colorA = "#8a5cff", colorB = "#27c8ff",
  intensity = 1.5, spread = 9,
}) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 42) * spread * 0.08;
  return <>
    <pointLight position={[position[0] - spread * 0.35 + drift, position[1], position[2]]} color={colorA} intensity={intensity} distance={spread * 4} decay={2} />
    <pointLight position={[position[0] + spread * 0.35 - drift, position[1] + spread * 0.15, position[2] - 1]} color={colorB} intensity={intensity * 0.72} distance={spread * 4} decay={2} />
  </>;
};
