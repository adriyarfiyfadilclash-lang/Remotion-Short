import React from "react";
import {Text} from "@react-three/drei";
import {useCurrentFrame} from "remotion";
import * as THREE from "three";

type Props={
  text:string;
  fontSize?:number;
  color?:string;
  glowIntensity?:number;
  pulse?:number;
  position?:[number,number,number];
  rotation?:[number,number,number];
};

export const Neon3DText:React.FC<Props>=({
  text,fontSize=1,color="#55DDF5",glowIntensity=2,pulse=.25,
  position=[0,0,0],rotation=[0,0,0]
})=>{
  const frame=useCurrentFrame();
  const intensity=glowIntensity*(1+pulse*Math.sin(frame/30*Math.PI*2));
  return <Text position={position} rotation={rotation} fontSize={fontSize} anchorX="center" anchorY="middle">
    {text}
    <meshStandardMaterial color={color} emissive={new THREE.Color(color)} emissiveIntensity={intensity} toneMapped={false}/>
  </Text>;
};
