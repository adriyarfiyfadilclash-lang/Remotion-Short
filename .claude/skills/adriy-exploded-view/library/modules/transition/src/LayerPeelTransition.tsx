import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = {
  children: React.ReactNode;
  startFrame?: number;
  duration?: number;
  peelDistance?: number;
  rotation?: [number, number, number];
  delay?: number;
};

/** Peels a grouped layer away with a small rotation, like opening a technical assembly. */
export const LayerPeelTransition: React.FC<Props> = ({
  children, startFrame = 0, duration = 30, peelDistance = 1.4, rotation = [0.45, 0, 0], delay = 0,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame - delay, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic),
  });
  return <group position={[0, peelDistance * p, 0]} rotation={[rotation[0] * p, rotation[1] * p, rotation[2] * p]}>{children}</group>;
};
