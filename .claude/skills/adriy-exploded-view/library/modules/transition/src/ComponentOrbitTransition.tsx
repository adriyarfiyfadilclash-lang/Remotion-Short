import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = {
  children: React.ReactNode;
  startFrame?: number;
  duration?: number;
  radius?: number;
  turns?: number;
  height?: number;
  reverse?: boolean;
};

/** Moves a component group along a controlled arc before settling at the origin. */
export const ComponentOrbitTransition: React.FC<Props> = ({
  children, startFrame = 0, duration = 45, radius = 1.8, turns = 0.5, height = 0.25, reverse = false,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], reverse ? [1, 0] : [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic),
  });
  const angle = p * Math.PI * 2 * turns;
  const r = radius * Math.sin(Math.PI * p);
  return <group position={[Math.cos(angle) * r, Math.sin(p * Math.PI) * height, Math.sin(angle) * r]}>{children}</group>;
};
