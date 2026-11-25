import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import * as THREE from "three";

export type CosmicFlash3DProps = {
  position?: [number, number, number];
  color?: THREE.ColorRepresentation;
  intensity?: number;
  durationInFrames?: number;
  startFrame?: number;
  distance?: number;
};

/** Short luminous flash, useful for impacts, starbursts, or transition beats. */
export const CosmicFlash3D: React.FC<CosmicFlash3DProps> = ({
  position = [0, 0, 0], color = "#e8f7ff", intensity = 8,
  durationInFrames = 12, startFrame = 0, distance = 18,
}) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;
  const envelope = interpolate(local, [0, 2, durationInFrames], [0, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  if (local < 0 || local > durationInFrames) return null;
  return <group position={position}>
    <pointLight color={color} intensity={intensity * envelope} distance={distance} decay={2} />
    <mesh>
      <sphereGeometry args={[0.12 + envelope * 0.38, 20, 20]} />
      <meshBasicMaterial color={color} transparent opacity={envelope} />
    </mesh>
  </group>;
};
