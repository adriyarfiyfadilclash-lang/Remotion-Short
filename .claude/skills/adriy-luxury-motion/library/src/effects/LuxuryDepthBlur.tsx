import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type Props = {
  children: React.ReactNode;
  startFrame?: number;
  duration?: number;
  fromBlur?: number;
  toBlur?: number;
  fromOpacity?: number;
  toOpacity?: number;
  style?: React.CSSProperties;
};

export const LuxuryDepthBlur: React.FC<Props> = ({
  children,
  startFrame = 0,
  duration = 30,
  fromBlur = 10,
  toBlur = 0,
  fromOpacity = 0.65,
  toOpacity = 1,
  style,
}) => {
  const frame = useCurrentFrame();
  const blur = interpolate(frame, [startFrame, startFrame + Math.max(1, duration)], [fromBlur, toBlur], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [startFrame, startFrame + Math.max(1, duration)], [fromOpacity, toOpacity], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ filter: `blur(${blur}px)`, opacity, ...style }}>
      {children}
    </div>
  );
};
