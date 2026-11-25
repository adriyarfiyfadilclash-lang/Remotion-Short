import React from "react";

/** Transparent luminous shell for highlighting a volume or boundary. */
type Props = {
  radius?: number;
  color?: string;
  opacity?: number;
  position?: [number, number, number];
  segments?: number;
  wireframe?: boolean;
};

export const ScientificGlowShell3D: React.FC<Props> = ({
  radius = 1,
  color = "#4fcfff",
  opacity = 0.16,
  position = [0, 0, 0],
  segments = 48,
  wireframe = false,
}) => (
  <group position={position}>
    <mesh>
      <sphereGeometry args={[radius, segments, Math.max(16, Math.floor(segments * 0.66))]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        wireframe={wireframe}
        side={2}
        depthWrite={false}
      />
    </mesh>
    <mesh scale={1.015}>
      <sphereGeometry args={[radius, segments, Math.max(16, Math.floor(segments * 0.66))]} />
      <meshBasicMaterial color={color} transparent opacity={opacity * 0.18} wireframe depthWrite={false} />
    </mesh>
  </group>
);
