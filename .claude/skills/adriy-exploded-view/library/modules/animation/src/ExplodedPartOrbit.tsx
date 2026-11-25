import React from "react";
import { useCurrentFrame } from "remotion";

type Props = {
  children: React.ReactNode;
  radius?: number;
  speed?: number;
  phase?: number;
  height?: number;
};

/** Adds a small deterministic orbital offset around the part's local origin. */
export const ExplodedPartOrbit: React.FC<Props> = ({ children, radius = 0.08, speed = 0.025, phase = 0, height = 0.025 }) => {
  const frame = useCurrentFrame();
  const angle = frame * speed + phase;
  return <group position={[Math.cos(angle) * radius, Math.sin(angle * 1.3) * height, Math.sin(angle) * radius]}>{children}</group>;
};
