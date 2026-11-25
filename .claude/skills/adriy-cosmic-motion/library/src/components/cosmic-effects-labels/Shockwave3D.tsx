import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import * as THREE from "three";

export type Shockwave3DProps = {
  position?: [number, number, number];
  color?: THREE.ColorRepresentation;
  startRadius?: number;
  endRadius?: number;
  durationInFrames?: number;
  startFrame?: number;
  opacity?: number;
};

/** Expanding thin shock front, oriented in the XZ plane by default. */
export const Shockwave3D: React.FC<Shockwave3DProps> = ({
  position = [0, 0, 0], color = "#b5eaff", startRadius = 0.2,
  endRadius = 8, durationInFrames = 50, startFrame = 0, opacity = 0.85,
}) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;
  const p = interpolate(local, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
  });
  const alpha = opacity * (1 - p);
  if (local < 0 || local > durationInFrames) return null;
  const radius = Math.max(0.001, startRadius + (endRadius - startRadius) * p);
  return <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} scale={[radius, radius, 1]}>
    <ringGeometry args={[0.985, 1, 128]} />
    <meshBasicMaterial color={color} transparent opacity={alpha} side={THREE.DoubleSide} depthWrite={false} />
  </mesh>;
};
