import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = {
  children: React.ReactNode;
  startFrame?: number;
  duration?: number;
  fromScale?: number;
  toScale?: number;
  fromY?: number;
  toY?: number;
};

/** Animated scale and rise for showing growth or staged development. */
export const GrowthSequence3D: React.FC<Props> = ({
  children,
  startFrame = 0,
  duration = 60,
  fromScale = 0.05,
  toScale = 1,
  fromY = -0.4,
  toY = 0,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const scale = fromScale + (toScale - fromScale) * p;
  const y = fromY + (toY - fromY) * p;
  return <group position={[0, y, 0]} scale={scale}>{children}</group>;
};
