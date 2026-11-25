import React from "react";
import { GroupProps } from "@react-three/fiber";
import { Capsule, Sphere } from "@react-three/drei";

export const MuscularSystem3D: React.FC<GroupProps & {muscleColor?:string;opacity?:number}> = ({
  muscleColor="#a9433e", opacity=1, ...props
}) => {
  const mat = <meshStandardMaterial color={muscleColor} roughness={0.58} transparent={opacity<1} opacity={opacity}/>;
  return <group {...props}>
    <Capsule args={[0.29,0.46,8,24]} position={[0,0.96,0]}>{mat}</Capsule>
    <Capsule args={[0.19,0.22,8,20]} position={[0,0.34,0]}>{mat}</Capsule>
    <Sphere args={[0.17,24,18]} position={[-0.22,1.22,0]}>{mat}</Sphere>
    <Sphere args={[0.17,24,18]} position={[0.22,1.22,0]}>{mat}</Sphere>
    {[-1,1].map((s)=><group key={s}>
      <Capsule args={[0.105,0.36,8,18]} position={[s*0.43,0.88,0]} rotation={[0,0,-s*0.12]}>{mat}</Capsule>
      <Capsule args={[0.09,0.27,8,18]} position={[s*0.16,-0.48,0]}>{mat}</Capsule>
      <Sphere args={[0.13,20,16]} position={[s*0.16,-0.22,0]}>{mat}</Sphere>
      <Capsule args={[0.095,0.31,8,18]} position={[s*0.16,-0.91,0]}>{mat}</Capsule>
    </group>)}
    <mesh position={[0,1.64,0]}><sphereGeometry args={[0.16,24,20]}/>{mat}</mesh>
    <mesh position={[0,0.98,0.19]}><sphereGeometry args={[0.13,20,16]}/>{mat}</mesh>
  </group>;
};
