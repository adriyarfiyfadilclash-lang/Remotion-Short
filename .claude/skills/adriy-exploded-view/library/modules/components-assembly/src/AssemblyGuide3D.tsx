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

/** Frame-revealed guide path showing the direction a component should travel. */
export const AssemblyGuide3D: React.FC<Props> = ({
  points,
  color = "#e5b765",
  lineWidth = 1.8,
  startFrame = 0,
  duration = 24,
  opacity = 0.9,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const count = Math.min(points.length, Math.max(2, Math.ceil(points.length * p)));
  return (
    <Line
      points={points.slice(0, count)}
      color={color}
      lineWidth={lineWidth}
      transparent
      opacity={opacity * p}
      dashed
    />
  );
};
