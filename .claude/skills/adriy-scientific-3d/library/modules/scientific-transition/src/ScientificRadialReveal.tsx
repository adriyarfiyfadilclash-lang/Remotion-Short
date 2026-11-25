import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

/** Radially scales a scene group from its center. */
export const ScientificRadialReveal: React.FC<{
  children: React.ReactNode; startFrame?: number; duration?: number; maxScale?: number;
}> = ({ children, startFrame = 0, duration = 32, maxScale = 1 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.15)),
  });
  return <group scale={0.001 + (maxScale - 0.001) * p}>{children}</group>;
};
