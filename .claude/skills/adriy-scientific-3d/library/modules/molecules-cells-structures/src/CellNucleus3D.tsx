import React from "react";

/** Cell nucleus with an outer envelope and inner nucleolus. */
type Props = {
  position?: [number, number, number];
  radius?: number;
  color?: string;
  nucleolusColor?: string;
  opacity?: number;
};

export const CellNucleus3D: React.FC<Props> = ({
  position = [0, 0, 0],
  radius = 0.34,
  color = "#a78bfa",
  nucleolusColor = "#f4b6d2",
  opacity = 0.88,
}) => (
  <group position={position}>
    <mesh>
      <sphereGeometry args={[radius, 32, 24]} />
      <meshPhysicalMaterial color={color} roughness={0.3} metalness={0.05} transparent opacity={opacity} />
    </mesh>
    <mesh position={[radius * 0.22, radius * 0.08, radius * 0.82]}>
      <sphereGeometry args={[radius * 0.28, 24, 16]} />
      <meshStandardMaterial color={nucleolusColor} roughness={0.35} />
    </mesh>
  </group>
);
