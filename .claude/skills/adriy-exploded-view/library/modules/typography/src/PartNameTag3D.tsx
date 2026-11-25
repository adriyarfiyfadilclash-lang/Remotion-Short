import React from "react";
import { Text } from "@react-three/drei";

type Props = {
  name: string;
  code?: string;
  position?: [number, number, number];
  color?: string;
  plateColor?: string;
  width?: number;
  fontSize?: number;
};

/** Compact floating nameplate for a separated component. */
export const PartNameTag3D: React.FC<Props> = ({
  name, code, position = [0, 0, 0], color = "#f2f6fa", plateColor = "#172a3b",
  width = 1.5, fontSize = 0.14,
}) => (
  <group position={position}>
    <mesh position={[width / 2, 0, -0.012]}>
      <planeGeometry args={[width, code ? 0.42 : 0.28]} />
      <meshBasicMaterial color={plateColor} transparent opacity={0.92} />
    </mesh>
    <Text position={[0.08, code ? 0.06 : 0, 0]} fontSize={fontSize} color={color} anchorX="left" anchorY="middle">
      {name}
    </Text>
    {code ? <Text position={[0.08, -0.12, 0]} fontSize={fontSize * 0.68} color="#8eb6cf" anchorX="left" anchorY="middle">{code}</Text> : null}
  </group>
);
