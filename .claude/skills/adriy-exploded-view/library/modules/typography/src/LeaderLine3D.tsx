import React from "react";
import { Line } from "@react-three/drei";
import { useCurrentFrame, interpolate } from "remotion";

type Props = {
  points: [number, number, number][];
  color?: string;
  lineWidth?: number;
  startFrame?: number;
  duration?: number;
  dashed?: boolean;
};

/** Technical leader line connecting a part to its annotation. */
export const LeaderLine3D: React.FC<Props> = ({
  points, color = "#80c9e8", lineWidth = 1.5, startFrame = 0, duration = 20, dashed = false,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const visibleCount = Math.max(2, Math.ceil(points.length * p));
  const visiblePoints = points.slice(0, visibleCount);
  return <Line points={visiblePoints} color={color} lineWidth={lineWidth} dashed={dashed} transparent opacity={p} />;
};
