import React from "react";

/** Conceptual spherical cell membrane shell. */
type Props = {
  radius?: number;
  color?: string;
  opacity?: number;
  thickness?: number;
  wireframe?: boolean;
};

export const CellMembrane3D: React.FC<Props> = ({
  radius = 1,
  color = "#4cc9b0",
  opacity = 0.22,
  thickness = 0.045,
  wireframe = false,
}) => (
  <group>
    <mesh>
      <sphereGeometry args={[radius, 48, 32]} />
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={opacity}
        roughness={0.24}
        metalness={0.05}
        transmission={0.18}
        thickness={thickness}
        side={2}
        wireframe={wireframe}
        depthWrite={false}
      />
    </mesh>
    <mesh>
      <sphereGeometry args={[radius * 0.985, 48, 32]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.14} />
    </mesh>
  </group>
);
