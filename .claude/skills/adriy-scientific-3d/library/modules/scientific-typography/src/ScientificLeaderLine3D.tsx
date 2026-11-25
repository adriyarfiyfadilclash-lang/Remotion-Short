import React from "react";
import { Line } from "@react-three/drei";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = {
  points: [number, number, number][];
  color?: string;
  lineWidth?: number;
  startFrame?: number;
  duration?: number;
  dashed?: boolean;
};

/** Animated leader line connecting a structure to its scientific label. */
export const ScientificLeaderLine3D: React.FC<Props> = ({
  points,
  color = "#75cce9",
  lineWidth = 1.4,
  startFrame = 0,
  duration = 20,
  dashed = false,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  if (points.length < 2) return null;
  const visibleCount = Math.min(points.length, Math.max(2, Math.ceil(points.length * p)));
  return (
    <Line
      points={points.slice(0, visibleCount)}
      color={color}
      lineWidth={lineWidth}
      dashed={dashed}
      transparent
      opacity={p}
    />
  );
};
