import React from "react";
import { Line } from "@react-three/drei";

type Props = {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  lineWidth?: number;
  dashed?: boolean;
  opacity?: number;
};

/** Visual guide between a component and its assembly position. */
export const AssemblyConnector3D: React.FC<Props> = ({
  start, end, color = "#80b9d6", lineWidth = 1.2, dashed = true, opacity = 0.65,
}) => (
  <Line
    points={[start, end]}
    color={color}
    lineWidth={lineWidth}
    dashed={dashed}
    transparent
    opacity={opacity}
  />
);
