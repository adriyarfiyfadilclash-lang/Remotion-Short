import React from "react";
import { interpolate } from "remotion";

type Props = {
  children: React.ReactNode;
  progress?: number;
  delay?: number;
  duration?: number;
  hiddenScale?: number;
};

/** Scales a component into view as the explosion/assembly progresses. */
export const ExplodedPartReveal: React.FC<Props> = ({ children, progress = 0, delay = 0, duration = 0.3, hiddenScale = 0.01 }) => {
  const p = interpolate(progress, [delay, Math.min(1, delay + duration)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return <group scale={hiddenScale + (1 - hiddenScale) * p}>{children}</group>;
};
