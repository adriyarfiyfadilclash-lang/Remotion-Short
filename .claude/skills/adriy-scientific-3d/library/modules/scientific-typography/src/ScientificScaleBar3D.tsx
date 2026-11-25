import React from "react";
import { Text } from "@react-three/drei";

type Props = {
  length?: number;
  divisions?: number;
  label?: string;
  position?: [number, number, number];
  color?: string;
  lineWidth?: number;
  fontSize?: number;
};

/** Simple scale bar for scientific illustrations; label units must be supplied by the author. */
export const ScientificScaleBar3D: React.FC<Props> = ({
  length = 1,
  divisions = 4,
  label = "1 unit",
  position = [0, 0, 0],
  color = "#eaf5fc",
  lineWidth = 0.018,
  fontSize = 0.12,
}) => (
  <group position={position}>
    <mesh position={[length / 2, 0, 0]}>
      <boxGeometry args={[length, lineWidth, lineWidth]} />
      <meshBasicMaterial color={color} />
    </mesh>
    {Array.from({ length: Math.max(1, divisions) + 1 }, (_, i) => (
      <mesh key={i} position={[length * i / Math.max(1, divisions), 0, 0]}>
        <boxGeometry args={[lineWidth, lineWidth * 5, lineWidth]} />
        <meshBasicMaterial color={color} />
      </mesh>
    ))}
    <Text position={[length / 2, -fontSize * 1.7, 0]} fontSize={fontSize} color={color} anchorX="center" anchorY="middle">
      {label}
    </Text>
  </group>
);
