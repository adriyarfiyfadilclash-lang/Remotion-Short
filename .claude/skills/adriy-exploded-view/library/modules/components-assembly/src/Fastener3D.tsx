import React from "react";

type Props = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  size?: number;
  length?: number;
  color?: string;
  metalness?: number;
  roughness?: number;
  headStyle?: "hex" | "round";
};

/** Simple stylized bolt with a hexagonal or round head. */
export const Fastener3D: React.FC<Props> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  size = 0.09,
  length = 0.32,
  color = "#aebdca",
  metalness = 0.86,
  roughness = 0.24,
  headStyle = "hex",
}) => (
  <group position={position} rotation={rotation}>
    <mesh position={[0, -length / 2, 0]}>
      <cylinderGeometry args={[size * 0.34, size * 0.34, length, 16]} />
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
    </mesh>
    <mesh>
      {headStyle === "hex"
        ? <cylinderGeometry args={[size, size, size * 0.42, 6]} />
        : <cylinderGeometry args={[size, size, size * 0.42, 32]} />}
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
    </mesh>
  </group>
);
