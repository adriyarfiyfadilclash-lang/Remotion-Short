import React from "react";

type Props = { size?: number; y?: number; color?: string; opacity?: number };

/** Matte receiver plane for soft-looking contact shadows. Enable shadows on renderer and lights. */
export const ShadowGround3D: React.FC<Props> = ({ size = 30, y = -1.05, color = "#171a22", opacity = 1 }) => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]} receiveShadow>
    <planeGeometry args={[size, size]} />
    <shadowMaterial transparent opacity={opacity} color={color} />
  </mesh>
);
