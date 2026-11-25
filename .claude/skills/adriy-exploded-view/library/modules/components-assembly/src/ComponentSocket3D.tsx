import React from "react";

type Props = {
  position?: [number, number, number];
  radius?: number;
  depth?: number;
  color?: string;
  metalness?: number;
  roughness?: number;
  radialSegments?: number;
};

/** Recessed socket or mounting port for an assembly demonstration. */
export const ComponentSocket3D: React.FC<Props> = ({
  position = [0, 0, 0],
  radius = 0.28,
  depth = 0.08,
  color = "#26394a",
  metalness = 0.72,
  roughness = 0.32,
  radialSegments = 48,
}) => (
  <group position={position}>
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[radius, radius, depth, radialSegments]} />
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
    </mesh>
    <mesh position={[0, 0, depth * 0.53]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius * 0.72, Math.max(0.012, radius * 0.055), 12, radialSegments]} />
      <meshStandardMaterial color="#9eb7c8" metalness={0.85} roughness={0.24} />
    </mesh>
  </group>
);
