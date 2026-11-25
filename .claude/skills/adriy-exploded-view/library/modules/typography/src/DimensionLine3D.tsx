import React from "react";
import { Line, Text } from "@react-three/drei";

type Props = {
  start: [number, number, number];
  end: [number, number, number];
  label: string;
  color?: string;
  fontSize?: number;
  offset?: [number, number, number];
};

/** Dimension guide with end ticks and a centered measurement label. */
export const DimensionLine3D: React.FC<Props> = ({
  start, end, label, color = "#e8b65d", fontSize = 0.14, offset = [0, 0.12, 0],
}) => {
  const mid: [number, number, number] = [(start[0] + end[0]) / 2 + offset[0], (start[1] + end[1]) / 2 + offset[1], (start[2] + end[2]) / 2 + offset[2]];
  const tick = 0.07;
  const startTick: [number, number, number][] = [[start[0], start[1] - tick, start[2]], [start[0], start[1] + tick, start[2]]];
  const endTick: [number, number, number][] = [[end[0], end[1] - tick, end[2]], [end[0], end[1] + tick, end[2]]];
  return (
    <group>
      <Line points={[start, end]} color={color} lineWidth={1.25} />
      <Line points={startTick} color={color} lineWidth={1.25} />
      <Line points={endTick} color={color} lineWidth={1.25} />
      <Text position={mid} fontSize={fontSize} color={color} anchorX="center" anchorY="bottom">
        {label}
      </Text>
    </group>
  );
};
