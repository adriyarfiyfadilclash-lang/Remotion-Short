import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props = {
  children: React.ReactNode;
  fromDegrees?: number;
  toDegrees?: number;
  startFrame?: number;
  endFrame?: number;
  style?: React.CSSProperties;
};

export const LuxuryRotate: React.FC<Props> = ({
  children,
  fromDegrees = -3,
  toDegrees = 0,
  startFrame = 0,
  endFrame = 36,
  style,
}) => {
  const frame = useCurrentFrame();
  const rotation = interpolate(frame, [startFrame, endFrame], [fromDegrees, toDegrees], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ transform: `rotate(${rotation}deg)`, ...style }}>
      {children}
    </div>
  );
};
