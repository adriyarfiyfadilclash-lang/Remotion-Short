import React from "react";
import { GroupProps } from "@react-three/fiber";
import { Sphere, Capsule } from "@react-three/drei";

export type Brain3DProps = GroupProps & {
  color?: string;
  lobeDetail?: boolean;
};

/** Bentuk otak stilisasi dengan belahan dan tonjolan permukaan sederhana. */
export const Brain3D: React.FC<Brain3DProps> = ({
  color="#d99b9b", lobeDetail=true, ...props
}) => {
  const mat = <meshStandardMaterial color={color} roughness={0.72}/>;
  return <group {...props}>
    {[-1,1].map(s=><group key={s} position={[s*0.18,0,0]}>
      <Sphere args={[0.34,32,24]} scale={[0.92,1,0.9]}>{mat}</Sphere>
      {lobeDetail && Array.from({length:5},(_,i)=><Capsule key={i} args={[0.035,0.16,6,10]}
        position={[s*(0.12+(i%2)*0.09),0.12-i*0.065,0.25]} rotation={[0,0,(i-2)*0.28]}>
        <meshStandardMaterial color="#efb6ae" roughness={0.7}/>
      </Capsule>)}
    </group>)}
    <Capsule args={[0.11,0.2,8,16]} position={[0,-0.34,-0.02]} rotation={[0,0,Math.PI/2]}>
      <meshStandardMaterial color="#c47f83"/>
    </Capsule>
  </group>;
};
