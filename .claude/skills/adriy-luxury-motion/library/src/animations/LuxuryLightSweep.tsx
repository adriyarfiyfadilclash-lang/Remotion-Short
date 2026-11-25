import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props = {
  width?: string | number;
  duration?: number;
  delay?: number;
  opacity?: number;
  angle?: number;
  color?: string;
};

export const LuxuryLightSweep: React.FC<Props> = ({
  width = "35%",
  duration = 48,
  delay = 0,
  opacity = 0.22,
  angle = 18,
  color = "rgba(255,255,255,0.9)",
}) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [delay, delay + duration], [-1.5, 2.5], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-30%",
          bottom: "-30%",
          left: `${x * 100}%`,
          width,
          transform: `skewX(-${angle}deg)`,
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          opacity,
          filter: "blur(10px)",
        }}
      />
    </div>
  );
};
