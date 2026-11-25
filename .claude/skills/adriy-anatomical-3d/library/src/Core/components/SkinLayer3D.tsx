import React from "react";
import { GroupProps } from "@react-three/fiber";
import { Capsule, Sphere } from "@react-three/drei";

export const SkinLayer3D: React.FC<GroupProps & {skinColor?:string;opacity?:number;wireframe?:boolean}> = ({
  skinColor="#d49b88", opacity=0.28, wireframe=false, ...props
}) => {
  const material = <meshPhysicalMaterial color={skinColor} roughness={0.42} clearcoat={0.24}
    transparent opacity={opacity} depthWrite={false} wireframe={wireframe}/>;
  return <group {...props}>
    <Sphere args={[0.235,32,24]} position={[0,1.63,0]}>{material}</Sphere>
    <Capsule args={[0.36,0.61,8,28]} position={[0,0.91,0]}>{material}</Capsule>
    <Capsule args={[0.27,0.29,8,24]} position={[0,0.31,0]}>{material}</Capsule>
    {[-1,1].map(s=><group key={s}>
      <Capsule args={[0.145,0.55,8,20]} position={[s*0.43,0.87,0]}>{material}</Capsule>
      <Capsule args={[0.15,0.68,8,20]} position={[s*0.16,-0.48,0]}>{material}</Capsule>
    </group>)}
  </group>;
};
