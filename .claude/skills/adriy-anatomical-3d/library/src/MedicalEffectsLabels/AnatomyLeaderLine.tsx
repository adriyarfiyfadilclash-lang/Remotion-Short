import React from "react";
import { Line } from "@react-three/drei";

export type AnatomyLeaderLineProps = {
  points: [number, number, number][];
  color?: string;
  lineWidth?: number;
  dashed?: boolean;
};

/** Garis penunjuk dari label menuju bagian anatomi. */
export const AnatomyLeaderLine: React.FC<AnatomyLeaderLineProps> = ({
  points, color = "#7bd8f0", lineWidth = 1.5, dashed = false,
}) => <Line points={points} color={color} lineWidth={lineWidth} dashed={dashed} />;
