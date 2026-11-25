import React from "react";
import { GroupProps } from "@react-three/fiber";
import { Bone, Joint } from "./shared";

export const HumanSkeleton3D: React.FC<GroupProps & {boneColor?:string}> = ({
  boneColor="#e9dfc8", ...props
}) => {
  const bones = [
    [[0,1.36,0],[0,0.35,0],0.055],
    [[0,1.28,0],[-0.27,1.05,0],0.045], [[0,1.28,0],[0.27,1.05,0],0.045],
    [[-0.27,1.05,0],[-0.43,0.56,0],0.04], [[0.27,1.05,0],[0.43,0.56,0],0.04],
    [[-0.43,0.56,0],[-0.45,0.12,0],0.032], [[0.43,0.56,0],[0.45,0.12,0],0.032],
    [[0,0.35,0],[-0.17,-0.12,0],0.05], [[0,0.35,0],[0.17,-0.12,0],0.05],
    [[-0.17,-0.12,0],[-0.17,-0.83,0],0.045], [[0.17,-0.12,0],[0.17,-0.83,0],0.045],
    [[-0.17,-0.83,0],[-0.17,-1.35,0],0.032], [[0.17,-0.83,0],[0.17,-1.35,0],0.032],
  ] as const;
  return <group {...props}>
    {bones.map((b,i)=><Bone key={i} from={b[0] as any} to={b[1] as any} radius={b[2]} color={boneColor}/>)}
    <Joint position={[0,1.52,0]} radius={0.16} color={boneColor}/>
    {[[0,1.05,0],[-.27,1.05,0],[.27,1.05,0],[-.43,.56,0],[.43,.56,0],[0,.35,0],[-.17,-.12,0],[.17,-.12,0],[-.17,-.83,0],[.17,-.83,0]].map((p,i)=>
      <Joint key={i} position={p as [number,number,number]} radius={i===0?0.09:0.065} color={boneColor}/>)}
    {Array.from({length:7},(_,i)=><mesh key={i} position={[0,0.98-i*0.095,0.025]} rotation={[0,0,Math.PI/2]}>
      <torusGeometry args={[0.19-i*0.009,0.018,8,32,Math.PI]}/>
      <meshStandardMaterial color={boneColor}/>
    </mesh>)}
  </group>;
};
