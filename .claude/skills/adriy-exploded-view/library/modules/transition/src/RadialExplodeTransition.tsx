import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = {
  children: React.ReactNode;
  startFrame?: number;
  duration?: number;
  radius?: number;
  angle?: number;
  height?: number;
  reverse?: boolean;
};

/** Radially pushes an object group outward from a chosen polar angle. */
export const RadialExplodeTransition: React.FC<Props> = ({
  children, startFrame = 0, duration = 36, radius = 2, angle = 0, height = 0.35, reverse = false,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], reverse ? [1, 0] : [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad),
  });
  return <group position={[Math.cos(angle) * radius * p, height * p, Math.sin(angle) * radius * p]}>{children}</group>;
};
