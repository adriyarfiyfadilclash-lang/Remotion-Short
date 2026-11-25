import React from "react";

export type XRayGlowEffectProps = {
  color?: string;
  intensity?: number;
  radius?: number;
  position?: [number, number, number];
  opacity?: number;
};

/** Cahaya kebiruan konseptual untuk tampilan tembus pandang/rontgen. */
export const XRayGlowEffect: React.FC<XRayGlowEffectProps> = ({
  color = "#75d9ff", intensity = 2, radius = 1.25,
  position = [0,0,0], opacity = 0.22,
}) => <group position={position}>
  <pointLight color={color} intensity={intensity} distance={radius * 7}/>
  <mesh>
    <sphereGeometry args={[radius,32,24]}/>
    <meshBasicMaterial color={color} transparent opacity={opacity} wireframe side={2}/>
  </mesh>
</group>;
