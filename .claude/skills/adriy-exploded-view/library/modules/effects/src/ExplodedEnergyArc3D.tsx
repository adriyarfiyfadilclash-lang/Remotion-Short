import React from "react";
import { Line } from "@react-three/drei";
import { useCurrentFrame, interpolate } from "remotion";

type Props = {
  points: [number, number, number][];
  color?: string;
  lineWidth?: number;
  startFrame?: number;
  duration?: number;
  opacity?: number;
};

/** Revealing technical energy path around an exposed component. */
export const ExplodedEnergyArc3D: React.FC<Props> = ({
  points,
  color = "#66dfff",
  lineWidth = 2,
  startFrame = 0,
  duration = 36,
  opacity = 0.9,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const count = Math.min(points.length, Math.max(2, Math.ceil(points.length * p)));
  if (points.length < 2) return null;
  return (
    <Line
      points={points.slice(0, count)}
      color={color}
      lineWidth={lineWidth}
      transparent
      opacity={opacity * p}
    />
  );
};
