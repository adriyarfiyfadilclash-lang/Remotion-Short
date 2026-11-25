import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = {
  children: React.ReactNode;
  startFrame?: number;
  duration?: number;
  distance?: number;
  direction?: [number, number, number];
};

/** Brings a separated group back toward its assembled center. */
export const ExplodeInTransition: React.FC<Props> = ({
  children, startFrame = 0, duration = 30, distance = 2, direction = [0, 1, 0],
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.15)),
  });
  return <group position={[direction[0] * distance * p, direction[1] * distance * p, direction[2] * distance * p]}>{children}</group>;
};
