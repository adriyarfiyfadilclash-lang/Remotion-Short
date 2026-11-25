import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = {
  children: React.ReactNode;
  startFrame?: number;
  duration?: number;
  distance?: number;
  direction?: [number, number, number];
  fade?: boolean;
};

/** Separates a complete scene/object group away from its center. */
export const ExplodeOutTransition: React.FC<Props> = ({
  children, startFrame = 0, duration = 30, distance = 1.8, direction = [0, 1, 0], fade = false,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic),
  });
  return (
    <group position={[direction[0] * distance * p, direction[1] * distance * p, direction[2] * distance * p]} scale={1 - p * 0.08}>
      {children}
    </group>
  );
};
