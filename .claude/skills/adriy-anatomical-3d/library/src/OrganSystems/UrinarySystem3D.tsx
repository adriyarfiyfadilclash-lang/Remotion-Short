import React from "react";
import { GroupProps } from "@react-three/fiber";
import { Capsule, Sphere, Cylinder } from "@react-three/drei";

export type UrinarySystem3DProps = GroupProps & {
  kidneyColor?: string;
  showUreters?: boolean;
};

/** Skema ginjal, ureter, dan kandung kemih untuk pengenalan sistem kemih. */
export const UrinarySystem3D: React.FC<UrinarySystem3DProps> = ({
  kidneyColor="#9f4e55", showUreters=true, ...props
}) => (
  <group {...props}>
    {[-1,1].map(s=><group key={s} position={[s*0.34,0.42,0]}>
      <Sphere args={[0.22,28,20]} scale={[0.82,1.12,0.7]}>
        <meshStandardMaterial color={kidneyColor} roughness={0.58}/>
      </Sphere>
      <Sphere args={[0.09,20,16]} position={[-s*0.13,0,0.04]}>
        <meshStandardMaterial color="#e2b58d"/>
      </Sphere>
      {showUreters && <Capsule args={[0.035,0.43,8,12]} position={[-s*0.08,-0.47,0]} rotation={[0,0,s*0.12]}>
        <meshStandardMaterial color="#d6b58e"/>
      </Capsule>}
    </group>)}
    <Sphere args={[0.2,28,20]} position={[0,-0.55,0]} scale={[0.9,0.72,0.8]}>
      <meshStandardMaterial color="#d6a16e" roughness={0.48}/>
    </Sphere>
    <Cylinder args={[0.035,0.035,0.2,12]} position={[0,-0.75,0]}>
      <meshStandardMaterial color="#d6b58e"/>
    </Cylinder>
  </group>
);
