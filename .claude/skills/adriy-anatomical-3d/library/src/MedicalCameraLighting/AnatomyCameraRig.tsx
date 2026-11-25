import React from "react";
import { PerspectiveCamera } from "@react-three/drei";

export type AnatomyCameraRigProps = {
  frame?: number;
  position?: [number, number, number];
  target?: [number, number, number];
  orbitRadius?: number;
  orbitSpeed?: number;
  fov?: number;
  enabled?: boolean;
};

/** Kamera orbit berbasis frame Remotion; hasilnya deterministik saat dirender. */
export const AnatomyCameraRig: React.FC<AnatomyCameraRigProps> = ({
  frame = 0, position = [0, 0.25, 6], target = [0, 0, 0],
  orbitRadius = 0, orbitSpeed = 0.012, fov = 42, enabled = true,
}) => {
  const angle = enabled ? frame * orbitSpeed : 0;
  const cameraPosition: [number, number, number] = orbitRadius > 0
    ? [position[0] + Math.sin(angle) * orbitRadius, position[1], position[2] + Math.cos(angle) * orbitRadius - orbitRadius]
    : position;
  return <PerspectiveCamera makeDefault position={cameraPosition} fov={fov} near={0.1} far={100} />;
};
