import React from "react";

/** Generic organelle primitive; choose geometry and color to match the diagram legend. */
type Props = {
  position?: [number, number, number];
  scale?: [number, number, number];
  color?: string;
  shape?: "sphere" | "ellipsoid" | "capsule" | "torus";
  rotation?: [number, number, number];
};

export const CellOrganelle3D: React.FC<Props> = ({
  position = [0, 0, 0],
  scale = [0.22, 0.13, 0.13],
  color = "#f59e72",
  shape = "ellipsoid",
  rotation = [0, 0, 0],
}) => (
  <mesh position={position} scale={scale} rotation={rotation}>
    {shape === "torus" ? (
      <torusGeometry args={[0.8, 0.22, 12, 32]} />
    ) : shape === "capsule" ? (
      <capsuleGeometry args={[0.7, 0.7, 6, 12]} />
    ) : (
      <sphereGeometry args={[1, 24, 16]} />
    )}
    <meshStandardMaterial color={color} roughness={0.4} metalness={0.04} />
  </mesh>
);
