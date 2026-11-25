import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = {
  children: React.ReactNode;
  startFrame?: number;
  duration?: number;
  position?: [number, number, number];
  scaleFrom?: number;
};

/** Groups labels and technical marks so they can appear together with a gentle reveal. */
export const AnnotationGroup3D: React.FC<Props> = ({
  children, startFrame = 0, duration = 18, position = [0, 0, 0], scaleFrom = 0.92,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad),
  });
  return <group position={position} scale={scaleFrom + (1 - scaleFrom) * p}>{children}</group>;
};
