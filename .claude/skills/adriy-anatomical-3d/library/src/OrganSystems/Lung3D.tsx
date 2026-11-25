import React from "react";
import { GroupProps } from "@react-three/fiber";
import { Capsule, Cylinder } from "@react-three/drei";
import { useCurrentFrame } from "remotion";

export type Lung3DProps = GroupProps & {
  color?: string;
  breathing?: boolean;
  breathRate?: number;
};

/** Dua paru-paru stilisasi; gerakan mengembang hanya untuk visualisasi konsep napas. */
export const Lung3D: React.FC<Lung3DProps> = ({
  color="#bd777d", breathing=true, breathRate=1, ...props
}) => {
  const frame = useCurrentFrame();
  const breath = breathing ? 1 + 0.07*Math.sin((frame/30)*Math.PI*2*breathRate) : 1;
  return <group {...props}>
    <Cylinder args={[0.055,0.055,0.48,12]} position={[0,0.45,0]}>
      <meshStandardMaterial color="#d8b6a5"/>
    </Cylinder>
    <Capsule args={[0.25,0.45,8,24]} position={[-0.29,0,0]} rotation={[0,0,0.08]} scale={[breath,breath,1]}>
      <meshPhysicalMaterial color={color} roughness={0.56} clearcoat={0.2}/>
    </Capsule>
    <Capsule args={[0.25,0.45,8,24]} position={[0.29,0,0]} rotation={[0,0,-0.08]} scale={[breath,breath,1]}>
      <meshPhysicalMaterial color={color} roughness={0.56} clearcoat={0.2}/>
    </Capsule>
    {[-1,1].map(s=><Cylinder key={s} args={[0.025,0.025,0.48,10]} position={[s*0.13,0.08,0.08]} rotation={[0,0,s*0.24]}>
      <meshStandardMaterial color="#d7b9a7"/>
    </Cylinder>)}
  </group>;
};
