import React from "react";
import { useCurrentFrame } from "remotion";
import * as THREE from "three";

export type EnergyHalo3DProps = {
  position?: [number, number, number];
  color?: THREE.ColorRepresentation;
  radius?: number;
  thickness?: number;
  rotationSpeed?: number;
  opacity?: number;
  tilt?: [number, number, number];
};

/** Glowing rotating halo to frame a planet, portal, or energy source. */
export const EnergyHalo3D: React.FC<EnergyHalo3DProps> = ({
  position = [0, 0, 0], color = "#58d9ff", radius = 2.8,
  thickness = 0.055, rotationSpeed = 0.012, opacity = 0.82,
  tilt = [0.45, 0.15, 0],
}) => {
  const frame = useCurrentFrame();
  return <mesh position={position} rotation={[tilt[0], tilt[1] + frame * rotationSpeed, tilt[2]]}>
    <torusGeometry args={[radius, thickness, 12, 160]} />
    <meshBasicMaterial color={color} transparent opacity={opacity} />
  </mesh>;
};
