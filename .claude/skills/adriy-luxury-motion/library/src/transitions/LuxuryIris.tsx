import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

type Props = {
  children: React.ReactNode;
  startFrame?: number;
  duration?: number;
  softness?: number;
};

export const LuxuryIris: React.FC<Props> = ({
  children,
  startFrame = 0,
  duration = 36,
  softness = 0,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [startFrame, startFrame + Math.max(1, duration)], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const radius = progress * 75 + softness;

  return (
    <AbsoluteFill
      style={{
        clipPath: `circle(${radius}% at 50% 50%)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
