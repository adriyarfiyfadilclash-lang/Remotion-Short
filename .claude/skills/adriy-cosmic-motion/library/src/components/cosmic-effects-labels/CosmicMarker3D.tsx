import React from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";

export type CosmicMarker3DProps = {
  position?: [number, number, number];
  label: string;
  color?: string;
  lineLength?: number;
  fontSize?: number;
  offset?: [number, number, number];
};

/** World-space callout marker with a connector and readable HTML label. */
export const CosmicMarker3D: React.FC<CosmicMarker3DProps> = ({
  position = [0, 0, 0], label, color = "#8bdcff",
  lineLength = 1.5, fontSize = 14, offset = [0.15, 0.2, 0],
}) => {
  const end: [number, number, number] = [offset[0] + lineLength, offset[1], offset[2]];
  const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...end)];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return <group position={position}>
    <mesh>
      <sphereGeometry args={[0.065, 12, 12]} />
      <meshBasicMaterial color={color} />
    </mesh>
    <line geometry={geometry}>
      <lineBasicMaterial color={color} />
    </line>
    <Html position={end} center={false} distanceFactor={12} style={{ pointerEvents: "none", whiteSpace: "nowrap" }}>
      <div style={{
        color, fontFamily: "Arial, sans-serif", fontSize, fontWeight: 700,
        letterSpacing: 1.2, textShadow: "0 0 8px rgba(70,190,255,.75)",
        background: "rgba(3,10,24,.72)", border: `1px solid ${color}`,
        borderRadius: 5, padding: "5px 9px",
      }}>{label}</div>
    </Html>
  </group>;
};
