import React from "react";
import { Text } from "@react-three/drei";

type Props = {
  text: string;
  position?: [number, number, number];
  color?: string;
  fontSize?: number;
  rotation?: [number, number, number];
};

/** Small axis name for charts, coordinate systems and scientific diagrams. */
export const ScientificAxisLabel3D: React.FC<Props> = ({
  text,
  position = [0, 0, 0],
  color = "#b8d5e5",
  fontSize = 0.14,
  rotation = [0, 0, 0],
}) => (
  <Text position={position} rotation={rotation} fontSize={fontSize} color={color} anchorX="center" anchorY="middle">
    {text}
  </Text>
);
