import React from "react";
import { GroupProps } from "@react-three/fiber";
import { Capsule, Sphere, Torus } from "@react-three/drei";

export type DigestiveSystem3DProps = GroupProps & {
  tubeColor?: string;
  stomachColor?: string;
  intestineColor?: string;
};

/** Skema saluran pencernaan untuk penjelasan alur; bukan rekonstruksi organ detail. */
export const DigestiveSystem3D: React.FC<DigestiveSystem3DProps> = ({
  tubeColor="#d8a06f", stomachColor="#c77a53", intestineColor="#d9a17e", ...props
}) => (
  <group {...props}>
    <Capsule args={[0.07,0.45,8,16]} position={[0,0.85,0]}>
      <meshStandardMaterial color={tubeColor}/>
    </Capsule>
    <Capsule args={[0.22,0.3,8,20]} position={[0.18,0.35,0]} rotation={[0,0,-0.5]}>
      <meshStandardMaterial color={stomachColor} roughness={0.55}/>
    </Capsule>
    <Sphere args={[0.12,20,16]} position={[-0.22,-0.05,0]}>
      <meshStandardMaterial color="#bd8a51"/>
    </Sphere>
    {Array.from({length:5},(_,i)=><Torus key={i} args={[0.2-i*0.012,0.045,8,32]}
      position={[0,-0.3-i*0.11,0]} rotation={[Math.PI/2,0,0]}>
      <meshStandardMaterial color={intestineColor} roughness={0.68}/>
    </Torus>)}
    <Capsule args={[0.19,0.43,8,18]} position={[0.34,-0.45,-0.02]} rotation={[0,0,Math.PI/2]}>
      <meshStandardMaterial color="#b87a65"/>
    </Capsule>
  </group>
);
