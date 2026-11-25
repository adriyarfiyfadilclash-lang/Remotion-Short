import React from "react";
import { Text } from "@react-three/drei";
import { LeaderLine3D } from "./LeaderLine3D";

type Props = {
  title: string;
  detail?: string;
  points: [number, number, number][];
  color?: string;
  detailColor?: string;
  fontSize?: number;
  startFrame?: number;
  duration?: number;
};

/** Multi-line technical annotation connected to a component by a leader line. */
export const TechnicalCallout3D: React.FC<Props> = ({
  title, detail, points, color = "#f0c16d", detailColor = "#d5e1eb",
  fontSize = 0.17, startFrame = 0, duration = 18,
}) => {
  const end = points[points.length - 1] ?? [0, 0, 0];
  return (
    <group>
      <LeaderLine3D points={points} color={color} startFrame={startFrame} duration={duration} />
      <Text position={[end[0] + 0.08, end[1] + 0.04, end[2]]} fontSize={fontSize} color={color} anchorX="left" anchorY="bottom">
        {title}
      </Text>
      {detail ? (
        <Text position={[end[0] + 0.08, end[1] - 0.14, end[2]]} fontSize={fontSize * 0.72} color={detailColor} anchorX="left" anchorY="top">
          {detail}
        </Text>
      ) : null}
    </group>
  );
};
