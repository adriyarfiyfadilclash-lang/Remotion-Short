import React from "react";
import { GroupProps } from "@react-three/fiber";
import { Sphere, Capsule } from "@react-three/drei";

export type IsolatedOrgan = "heart" | "lungs" | "brain" | "stomach";
export type OrganIsolation3DProps = GroupProps & {
  organ?: IsolatedOrgan;
  color?: string;
  scale?: number;
};

/** Bentuk organ bergaya untuk pengenalan visual; bukan model anatomi rinci. */
export const OrganIsolation3D: React.FC<OrganIsolation3DProps> = ({
  organ="heart", color, scale=1, ...props
}) => {
  const palette: Record<IsolatedOrgan,string> = {
    heart:"#b93642", lungs:"#bd7779", brain:"#d6a2a0", stomach:"#c87955"
  };
  const c = color || palette[organ];
  const mat = <meshPhysicalMaterial color={c} roughness={0.48} clearcoat={0.25}/>;
  return <group {...props} scale={scale}>
    {organ==="heart" && <>
      <Sphere args={[0.34,32,24]} position={[-0.19,0.05,0]} scale={[1,1.1,0.8]}>{mat}</Sphere>
      <Sphere args={[0.34,32,24]} position={[0.19,0.05,0]} scale={[1,1.1,0.8]}>{mat}</Sphere>
      <Capsule args={[0.075,0.28,8,16]} position={[0.02,0.48,0]} rotation={[0,0,-0.12]}><meshStandardMaterial color="#a82f39"/></Capsule>
    </>}
    {organ==="lungs" && <>
      <Capsule args={[0.25,0.48,8,24]} position={[-0.29,0,0]} rotation={[0,0,0.08]}>{mat}</Capsule>
      <Capsule args={[0.25,0.48,8,24]} position={[0.29,0,0]} rotation={[0,0,-0.08]}>{mat}</Capsule>
      <Capsule args={[0.06,0.38,8,16]} position={[0,0.44,0]}><meshStandardMaterial color="#e0b8a5"/></Capsule>
    </>}
    {organ==="brain" && <>
      {Array.from({length:9},(_,i)=><Sphere key={i} args={[0.22,20,16]}
        position={[(i%3-1)*0.19,(Math.floor(i/3)-1)*0.16,0]} scale={[1,0.82,0.82]}>{mat}</Sphere>)}
    </>}
    {organ==="stomach" && <>
      <Capsule args={[0.28,0.43,10,24]} position={[0,0,0]} rotation={[0,0,-0.45]} scale={[1,1.2,0.8]}>{mat}</Capsule>
      <Capsule args={[0.09,0.35,8,16]} position={[0.22,-0.36,0]} rotation={[0,0,0.6]}><meshStandardMaterial color={c}/></Capsule>
    </>}
  </group>;
};
