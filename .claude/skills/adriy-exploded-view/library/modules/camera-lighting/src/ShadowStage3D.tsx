import React from "react";

type Props = {
  size?: number;
  y?: number;
  color?: string;
  opacity?: number;
  roughness?: number;
};

/** Matte ground plane to anchor the exploded object visually. */
export const ShadowStage3D: React.FC<Props> = ({
  size = 30,
  y = -1.5,
  color = "#101b28",
  opacity = 1,
  roughness = 0.92,
}) => (
  <mesh position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
    <planeGeometry args={[size, size]} />
    <meshStandardMaterial color={color} roughness={roughness} transparent={opacity < 1} opacity={opacity} />
  </mesh>
);
