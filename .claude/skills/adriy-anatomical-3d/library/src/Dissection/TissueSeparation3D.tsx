import React from "react";
import { GroupProps } from "@react-three/fiber";
import { Sphere, Torus } from "@react-three/drei";
import { useCurrentFrame } from "remotion";

export type TissueSeparation3DProps = GroupProps & {
  separation?: number;
  animate?: boolean;
};

/** Menampilkan susunan lapisan jaringan secara bertingkat. */
export const TissueSeparation3D: React.FC<TissueSeparation3DProps> = ({
  separation=0.28, animate=true, ...props
}) => {
  const frame = useCurrentFrame();
  const s = animate ? separation*(0.5+0.5*Math.sin(frame/28)) : separation;
  const layers = [
    {r:0.82,c:"#d99b87",z:s*1.5},
    {r:0.66,c:"#b64f4c",z:s*0.5},
    {r:0.48,c:"#e6c89c",z:-s*0.5},
    {r:0.28,c:"#b8756d",z:-s*1.5},
  ];
  return <group {...props}>
    {layers.map((l,i)=><group key={i} position={[0,0,l.z]}>
      <Sphere args={[l.r,40,28]} scale={[1,0.34,1]}>
        <meshStandardMaterial color={l.c} roughness={0.7} side={2}/>
      </Sphere>
      <Torus args={[l.r*0.83,0.025,8,48]} rotation={[Math.PI/2,0,0]}>
        <meshStandardMaterial color="#f1d8bd"/>
      </Torus>
    </group>)}
  </group>;
};
