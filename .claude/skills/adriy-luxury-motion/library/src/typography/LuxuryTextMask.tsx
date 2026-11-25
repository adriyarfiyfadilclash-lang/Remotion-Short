import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props = {
  text: string;
  startFrame?: number;
  duration?: number;
  fontSize?: number | string;
  color?: string;
  fontFamily?: string;
  style?: React.CSSProperties;
};

export const LuxuryTextMask: React.FC<Props> = ({
  text,
  startFrame = 0,
  duration = 32,
  fontSize = 76,
  color = "#F2EFE8",
  fontFamily = "Georgia, 'Times New Roman', serif",
  style,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [startFrame, startFrame + Math.max(1, duration)], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ overflow: "hidden", ...style }}>
      <div
        style={{
          color,
          fontFamily,
          fontSize,
          lineHeight: 1.05,
          letterSpacing: "-0.035em",
          clipPath: `inset(${(1 - progress) * 100}% 0 0 0)`,
          transform: `translateY(${(1 - progress) * 14}px)`,
        }}
      >
        {text}
      </div>
    </div>
  );
};
