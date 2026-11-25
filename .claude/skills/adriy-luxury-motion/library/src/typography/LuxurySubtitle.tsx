import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props = {
  text: string;
  startFrame?: number;
  duration?: number;
  color?: string;
  accentColor?: string;
  fontSize?: number | string;
  fontFamily?: string;
  style?: React.CSSProperties;
};

export const LuxurySubtitle: React.FC<Props> = ({
  text,
  startFrame = 0,
  duration = 24,
  color = "#AAA49A",
  accentColor = "#C8B58A",
  fontSize = 18,
  fontFamily = "Arial, Helvetica, sans-serif",
  style,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [startFrame, startFrame + Math.max(1, duration)], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, ...style }}>
      <div
        style={{
          height: 1,
          width: 42 * progress,
          backgroundColor: accentColor,
          flexShrink: 0,
        }}
      />
      <div
        style={{
          opacity: progress,
          transform: `translateX(${(1 - progress) * 8}px)`,
          color,
          fontSize,
          fontFamily,
          letterSpacing: "0.025em",
          lineHeight: 1.5,
        }}
      >
        {text}
      </div>
    </div>
  );
};
