import React from "react";
import { interpolate, Easing, useCurrentFrame } from "remotion";

type Props = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  startScale?: number;
  style?: React.CSSProperties;
};

export const LuxuryReveal: React.FC<Props> = ({
  children,
  delay = 0,
  duration = 28,
  distance = 24,
  startScale = 0.985,
  style,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [delay, delay + duration], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity: progress,
        transform: `translateY(${(1 - progress) * distance}px) scale(${startScale + (1 - startScale) * progress})`,
        willChange: "transform, opacity",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
