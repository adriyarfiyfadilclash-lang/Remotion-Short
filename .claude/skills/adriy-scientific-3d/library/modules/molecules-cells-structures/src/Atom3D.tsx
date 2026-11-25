import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

type Props = {
  position?: [number, number, number];
  radius?: number;
  color?: string;
  pulse?: boolean;
  pulseAmount?: number;
  startFrame?: number;
};

/** Spherical atom marker with optional deterministic pulse. */
export const Atom3D: React.FC<Props> = ({
  position = [0, 0, 0],
  radius = 0.16,
  color = "#65c8ee",
  pulse = false,
  pulseAmount = 0.08,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const phase = Math.max(0, frame - startFrame);
  const scale = pulse ? 1 + Math.sin(phase * 0.12) * pulseAmount : 1;
  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[radius, 24, 16]} />
      <meshStandardMaterial color={color} roughness={0.28} metalness={0.12} />
    </mesh>
  );
};
