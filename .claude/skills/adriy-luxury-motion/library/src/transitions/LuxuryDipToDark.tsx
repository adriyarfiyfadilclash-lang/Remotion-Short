import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

type Props = {
  children: React.ReactNode;
  startFrame?: number;
  duration?: number;
  color?: string;
};

export const LuxuryDipToDark: React.FC<Props> = ({
  children,
  startFrame = 0,
  duration = 36,
  color = "#050607",
}) => {
  const frame = useCurrentFrame();
  const half = Math.max(1, duration / 2);
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + half, startFrame + duration],
    [0, 1, 0],
    {
      easing: Easing.inOut(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill>
      {children}
      <AbsoluteFill style={{ backgroundColor: color, opacity, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};
