import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props = {
  from: React.ReactNode;
  to: React.ReactNode;
  transitionStart: number;
  duration?: number;
};

export const LuxuryCrossfade: React.FC<Props> = ({
  from,
  to,
  transitionStart,
  duration = 24,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame,
    [transitionStart, transitionStart + Math.max(1, duration)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: 1 - progress }}>{from}</AbsoluteFill>
      <AbsoluteFill style={{ opacity: progress }}>{to}</AbsoluteFill>
    </AbsoluteFill>
  );
};
