import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props = {
  text: string;
  startFrame?: number;
  duration?: number;
  distance?: number;
  fontSize?: number | string;
  color?: string;
  fontFamily?: string;
  style?: React.CSSProperties;
};

export const LuxuryTextReveal: React.FC<Props> = ({
  text,
  startFrame = 0,
  duration = 30,
  distance = 18,
  fontSize = 72,
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
    <div
      style={{
        opacity: progress,
        transform: `translateY(${(1 - progress) * distance}px)`,
        color,
        fontFamily,
        fontSize,
        lineHeight: 1.02,
        letterSpacing: "-0.035em",
        ...style,
      }}
    >
      {text}
    </div>
  );
};
