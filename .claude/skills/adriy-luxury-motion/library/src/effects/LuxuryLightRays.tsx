import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props = {
  startFrame?: number;
  duration?: number;
  opacity?: number;
  color?: string;
  angle?: number;
  count?: number;
};

export const LuxuryLightRays: React.FC<Props> = ({
  startFrame = 0,
  duration = 90,
  opacity = 0.1,
  color = "#F4E9D2",
  angle = -24,
  count = 3,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [startFrame, startFrame + Math.max(1, duration)], [-8, 8], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {Array.from({ length: Math.max(1, Math.min(count, 6)) }).map((_, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: "-35%",
            bottom: "-35%",
            left: `${18 + index * 24 + progress}%`,
            width: `${5 + (index % 2) * 3}%`,
            transform: `rotate(${angle}deg)`,
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            opacity: opacity / (index + 1),
            filter: "blur(18px)",
          }}
        />
      ))}
    </div>
  );
};
