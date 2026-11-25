import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props = {
  children: React.ReactNode;
  from?: number;
  to?: number;
  startFrame?: number;
  endFrame?: number;
  style?: React.CSSProperties;
};

export const LuxuryZoom: React.FC<Props> = ({
  children,
  from = 1,
  to = 1.06,
  startFrame = 0,
  endFrame = 120,
  style,
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [startFrame, endFrame], [from, to], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ transform: `scale(${scale})`, ...style }}>
      {children}
    </div>
  );
};
