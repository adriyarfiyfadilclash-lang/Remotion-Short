import React from "react";
import { GroupProps } from "@react-three/fiber";
import { Capsule, Sphere } from "@react-three/drei";

export type HumanBodyRigProps = GroupProps & {
  armSwing?: number;
  legSwing?: number;
  torsoRotation?: number;
  skinColor?: string;
};

/** Rig dasar dengan pivot bahu dan pinggul untuk pose edukasi sederhana. */
export const HumanBodyRig: React.FC<HumanBodyRigProps> = ({
  armSwing=0, legSwing=0, torsoRotation=0, skinColor="#bd806f", ...props
}) => {
  const mat = <meshStandardMaterial color={skinColor} roughness={0.68}/>;
  return <group {...props} rotation={[0,torsoRotation,0]}>
    <Sphere args={[0.21,24,20]} position={[0,1.62,0]}>{mat}</Sphere>
    <Capsule args={[0.31,0.56,8,24]} position={[0,0.94,0]}>{mat}</Capsule>
    {[-1,1].map(s=><group key={s} position={[s*0.36,1.18,0]} rotation={[0,0,s*armSwing]}>
      <Capsule args={[0.105,0.44,8,18]} position={[s*0.07,-0.3,0]}>{mat}</Capsule>
      <Sphere args={[0.09,18,14]} position={[s*0.07,-0.62,0]}>{mat}</Sphere>
      <Capsule args={[0.085,0.31,8,18]} position={[s*0.07,-0.85,0]}>{mat}</Capsule>
    </group>)}
    {[-1,1].map(s=><group key={s} position={[s*0.15,0.43,0]} rotation={[legSwing*s,0,0]}>
      <Capsule args={[0.12,0.48,8,18]} position={[0,-0.36,0]}>{mat}</Capsule>
      <Capsule args={[0.105,0.48,8,18]} position={[0,-0.91,0]}>{mat}</Capsule>
      <Sphere args={[0.11,18,14]} position={[0,-1.17,0.08]}>{mat}</Sphere>
    </group>)}
  </group>;
};
