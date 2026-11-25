import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

type Props = {
  children: React.ReactNode;
  startFrame?: number;
  duration?: number;
  blurAmount?: number;
};

export const LuxuryBlurReveal: React.FC<Props> = ({
  children,
  startFrame = 0,
  duration = 28,
  blurAmount = 12,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [startFrame, startFrame + Math.max(1, duration)], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blur = (1 - progress) * blurAmount;

  return (
    <AbsoluteFill
      style={{
        opacity: progress,
        filter: `blur(${blur}px)`,
        transform: `scale(${1.015 - progress * 0.015})`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
