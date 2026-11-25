import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props = {
  startFrame?: number;
  duration?: number;
  opacity?: number;
  width?: string;
  angle?: number;
  color?: string;
};

export const LuxuryMetallicSweep: React.FC<Props> = ({
  startFrame = 0,
  duration = 54,
  opacity = 0.28,
  width = "28%",
  angle = -18,
  color = "rgba(255, 245, 220, 0.9)",
}) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [startFrame, startFrame + Math.max(1, duration)], [-1, 3], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: "-35%",
          bottom: "-35%",
          left: `${x * 100}%`,
          width,
          transform: `skewX(${angle}deg)`,
          background: `linear-gradient(90deg, transparent 0%, ${color} 48%, transparent 100%)`,
          opacity,
          filter: "blur(8px)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
};
