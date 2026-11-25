import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

type Props = { children: React.ReactNode; duration?: number; delay?: number; maxBlur?: number };

/** Soft-focus reveal for reflective or memory-driven transitions. */
export const DocumentaryBlurDissolve: React.FC<Props> = ({
  children, duration = 24, delay = 0, maxBlur = 12,
}) => {
  const frame = useCurrentFrame() - delay;
  const p = interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
  });
  const blur = interpolate(p, [0, 1], [maxBlur, 0]);
  return <AbsoluteFill style={{ opacity: p, filter: `blur(${blur}px)` }}>{children}</AbsoluteFill>;
};
