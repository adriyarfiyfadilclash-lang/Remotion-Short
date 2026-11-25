import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type Props = {
  color?: string;
  intensity?: number;
  startFrame?: number;
  fadeInDuration?: number;
  size?: string;
  x?: string;
  y?: string;
};

export const LuxurySoftGlow: React.FC<Props> = ({
  color = "#C8B58A",
  intensity = 0.2,
  startFrame = 0,
  fadeInDuration = 24,
  size = "55%",
  x = "65%",
  y = "45%",
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [startFrame, startFrame + Math.max(1, fadeInDuration)], [0, intensity], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background: `radial-gradient(ellipse ${size} ${size} at ${x} ${y}, ${color} 0%, transparent 72%)`,
        opacity,
        mixBlendMode: "screen",
      }}
    />
  );
};
