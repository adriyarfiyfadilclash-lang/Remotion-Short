import React from "react";
import { useCurrentFrame } from "remotion";

type Props = {
  radius?: number;
  thickness?: number;
  color?: string;
  position?: [number, number, number];
  startFrame?: number;
  speed?: number;
  repeat?: boolean;
};

/** Expanding torus pulse around a point or object. */
export const ScientificEnergyPulse3D: React.FC<Props> = ({
  radius = 0.35,
  thickness = 0.035,
  color = "#64dcff",
  position = [0, 0, 0],
  startFrame = 0,
  speed = 0.035,
  repeat = true,
}) => {
  const frame = Math.max(0, useCurrentFrame() - startFrame);
  const phase = repeat ? (frame * speed) % 1 : Math.min(1, frame * speed);
  const scale = 0.45 + phase * 2.2;
  const opacity = repeat ? 1 - phase : 1 - phase * 0.85;
  return (
    <mesh position={position} scale={scale}>
      <torusGeometry args={[radius, thickness, 12, 64]} />
      <meshBasicMaterial color={color} transparent opacity={Math.max(0, opacity)} depthWrite={false} />
    </mesh>
  );
};
