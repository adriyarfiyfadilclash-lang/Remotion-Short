import React from "react";

type Props = { size?: number; divisions?: number; color?: string; secondaryColor?: string; opacity?: number; y?: number };

/** Procedural grid floor for technical, sci-fi, or studio environments. */
export const ProceduralGround3D: React.FC<Props> = ({ size = 30, divisions = 30, color = "#42617c", secondaryColor = "#1d344a", opacity = 0.45, y = -1.1 }) => (
  <group position={[0, y, 0]}>
    <gridHelper args={[size, divisions, color, secondaryColor]} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.006, 0]}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial color="#07111e" transparent opacity={0.72} />
    </mesh>
  </group>
);
