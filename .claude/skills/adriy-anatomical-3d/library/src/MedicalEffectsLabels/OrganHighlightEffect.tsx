import React from "react";

export type OrganHighlightEffectProps = {
  position?: [number, number, number];
  color?: string;
  intensity?: number;
  radius?: number;
  pulse?: number;
  frame?: number;
  children?: React.ReactNode;
};

/** Sorotan organ dengan cahaya dan cincin penanda berdenyut. */
export const OrganHighlightEffect: React.FC<OrganHighlightEffectProps> = ({
  position = [0,0,0], color = "#ff647c", intensity = 2.2,
  radius = 0.9, pulse = 0.08, frame = 0, children,
}) => {
  const scale = 1 + Math.sin(frame * 0.12) * pulse;
  return <group position={position}>
    <pointLight color={color} intensity={intensity} distance={radius * 5}/>
    <mesh rotation={[Math.PI/2,0,0]} scale={scale}>
      <torusGeometry args={[radius,0.018,8,72]}/>
      <meshBasicMaterial color={color} transparent opacity={0.82}/>
    </mesh>
    {children}
  </group>;
};
