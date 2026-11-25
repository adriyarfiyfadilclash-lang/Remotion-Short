import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = {
  children: React.ReactNode;
  radius?: number;
  height?: number;
  startAngle?: number;
  endAngle?: number;
  startFrame?: number;
  duration?: number;
  clockwise?: boolean;
};

/** Moves a scientific marker or particle along a circular orbit. */
export const ScientificOrbit3D: React.FC<Props> = ({
  children,
  radius = 1,
  height = 0,
  startAngle = 0,
  endAngle = Math.PI * 2,
  startFrame = 0,
  duration = 90,
  clockwise = true,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.linear,
  });
  const direction = clockwise ? 1 : -1;
  const angle = startAngle + (endAngle - startAngle) * p * direction;
  return (
    <group position={[Math.cos(angle) * radius, height, Math.sin(angle) * radius]}>
      {children}
    </group>
  );
};
