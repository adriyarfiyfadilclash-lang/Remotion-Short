import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import * as THREE from "three";

export type EnergyBurst3DProps = {
  position?: [number, number, number];
  color?: THREE.ColorRepresentation;
  maxRadius?: number;
  durationInFrames?: number;
  startFrame?: number;
  ringCount?: number;
};

/** Expanding layered energy rings with a deterministic Remotion timeline. */
export const EnergyBurst3D: React.FC<EnergyBurst3DProps> = ({
  position = [0, 0, 0], color = "#63d8ff", maxRadius = 7,
  durationInFrames = 42, startFrame = 0, ringCount = 3,
}) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;
  const progress = interpolate(local, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
  });
  const opacity = interpolate(local, [0, durationInFrames * 0.25, durationInFrames], [0, 0.9, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  if (local < 0 || local > durationInFrames) return null;
  return <group position={position}>
    {Array.from({ length: Math.max(1, ringCount) }, (_, i) => {
      const radius = Math.max(0.001, maxRadius * progress * (0.58 + i * 0.2));
      return <mesh key={i} rotation={[Math.PI / 2, 0, 0]} scale={[radius, radius, 1]}>
        <ringGeometry args={[0.94, 1, 96]} />
        <meshBasicMaterial color={color} transparent opacity={opacity * (1 - i * 0.18)} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>;
    })}
    <pointLight color={color} intensity={opacity * 4} distance={maxRadius * 3} decay={2} />
  </group>;
};
