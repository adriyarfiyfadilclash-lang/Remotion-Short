import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

type Props = {
  position?: [number, number, number];
  radius?: number;
  thickness?: number;
  color?: string;
  startFrame?: number;
  duration?: number;
  repeat?: boolean;
};

/** Expanding ring pulse to mark a separation point or component boundary. */
export const ExplodedPulseRing3D: React.FC<Props> = ({
  position = [0, 0, 0],
  radius = 0.35,
  thickness = 0.025,
  color = "#62d7ff",
  startFrame = 0,
  duration = 36,
  repeat = false,
}) => {
  const frame = useCurrentFrame();
  const raw = (frame - startFrame) / Math.max(1, duration);
  const p = repeat ? ((raw % 1) + 1) % 1 : Math.max(0, Math.min(1, raw));
  const scale = 0.6 + p * 2.8;
  const opacity = repeat ? 1 - p : interpolate(p, [0, 0.15, 1], [0, 0.85, 0]);
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} scale={scale}>
      <torusGeometry args={[radius, thickness, 8, 64]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
};
