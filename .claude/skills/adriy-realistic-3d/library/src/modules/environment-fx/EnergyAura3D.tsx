import React from "react";
import { useCurrentFrame } from "remotion";

type Props = { radius?: number; color?: string; intensity?: number; speed?: number; opacity?: number };

/** Soft pulsing aura shell. Use additive blending sparingly for glowing subjects. */
export const EnergyAura3D: React.FC<Props> = ({ radius = 1.35, color = "#4ccfff", intensity = 1, speed = 0.06, opacity = 0.18 }) => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame * speed) * 0.035;
  return <mesh scale={radius * pulse}>
    <sphereGeometry args={[1, 32, 24]} />
    <meshBasicMaterial color={color} transparent opacity={opacity * intensity} wireframe depthWrite={false} />
  </mesh>;
};
