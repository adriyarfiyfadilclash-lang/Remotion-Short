import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  children: React.ReactNode;
  amplitude?: number;
  periodInFrames?: number;
  phase?: number;
  style?: React.CSSProperties;
};

export const LuxuryFloat: React.FC<Props> = ({
  children,
  amplitude = 6,
  periodInFrames = 96,
  phase = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const safePeriod = Math.max(periodInFrames, fps);
  const cycle = ((frame + phase) % safePeriod) / safePeriod;
  const y = interpolate(cycle, [0, 0.25, 0.5, 0.75, 1], [0, -amplitude, 0, amplitude, 0]);

  return (
    <div style={{ transform: `translateY(${y}px)`, ...style }}>
      {children}
    </div>
  );
};
