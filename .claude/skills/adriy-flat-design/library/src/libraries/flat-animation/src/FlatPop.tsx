import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  fromScale?: number;
  overshoot?: number;
};

/** Snappy flat-design pop entrance with a controlled spring scale. */
export const FlatPop: React.FC<Props> = ({
  children, delay = 0, fromScale = 0.72, overshoot = 1,
}) => {
  const frame = useCurrentFrame() - delay;
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: { damping: 13, stiffness: 150, mass: 0.7 } });
  const scale = interpolate(p, [0, 1], [fromScale, overshoot]);
  const opacity = interpolate(frame, [0, 5], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ opacity, transform: `scale(${scale})` }}>{children}</AbsoluteFill>;
};
