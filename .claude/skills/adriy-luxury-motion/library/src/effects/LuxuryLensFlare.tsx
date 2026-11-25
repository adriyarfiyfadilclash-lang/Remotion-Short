import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props = {
  startFrame?: number;
  duration?: number;
  x?: string;
  y?: string;
  intensity?: number;
  color?: string;
};

export const LuxuryLensFlare: React.FC<Props> = ({
  startFrame = 0,
  duration = 36,
  x = "68%",
  y = "32%",
  intensity = 0.16,
  color = "#F7E8C8",
}) => {
  const frame = useCurrentFrame();
  const pulse = interpolate(
    frame,
    [startFrame, startFrame + duration * 0.25, startFrame + duration * 0.7, startFrame + duration],
    [0, intensity, intensity * 0.55, 0],
    { easing: Easing.inOut(Easing.quad), extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: pulse,
        background: `
          radial-gradient(ellipse 2.5% 2.5% at ${x} ${y}, #ffffff 0%, ${color} 25%, transparent 75%),
          linear-gradient(0deg, transparent 49.85%, ${color} 50%, transparent 50.15%),
          linear-gradient(90deg, transparent 49.85%, ${color} 50%, transparent 50.15%)
        `,
        filter: "blur(1.5px)",
        mixBlendMode: "screen",
      }}
    />
  );
};
