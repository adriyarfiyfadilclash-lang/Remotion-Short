import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = {
  children: React.ReactNode;
  startFrame?: number;
  duration?: number;
  fromScale?: number;
  toScale?: number;
};

/** Softly reveals a scientific scene with a subtle scale settle. */
export const ScientificDissolveTransition: React.FC<Props> = ({
  children, startFrame = 0, duration = 24, fromScale = 0.96, toScale = 1,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
  });
  return <group scale={fromScale + (toScale - fromScale) * p}>{children}</group>;
};
