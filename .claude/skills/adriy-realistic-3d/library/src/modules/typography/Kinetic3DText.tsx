import React from "react";
import {Text} from "@react-three/drei";
import {useCurrentFrame} from "remotion";
import * as THREE from "three";

type Props={
  text:string;
  fontSize?:number;
  color?:string;
  position?:[number,number,number];
  staggerFrames?:number;
  startFrame?:number;
  spacing?:number;
  rotationY?:number;
};

export const Kinetic3DText:React.FC<Props>=({
  text,fontSize=.65,color="#F0C477",position=[0,0,0],
  staggerFrames=3,startFrame=0,spacing=1,rotationY=-.35
})=>{
  const frame=useCurrentFrame();
  const chars=Array.from(text);
  const width=chars.reduce((sum,ch)=>sum+(ch===" "?0.45:1),0)*fontSize*spacing;
  let cursor=-width/2;
  return <group position={position}>
    {chars.map((char,index)=>{
      const x=cursor;
      cursor+=(char===" "?0.45:1)*fontSize*spacing;
      const t=THREE.MathUtils.clamp((frame-startFrame-index*staggerFrames)/14,0,1);
      const eased=1-Math.pow(1-t,3);
      return char===" "?null:<Text
        key={`${index}-${char}`}
        position={[x+fontSize*.5,-(1-eased)*.55,0]}
        rotation={[0,rotationY*(1-eased),0]}
        fontSize={fontSize}
        anchorX="center"
        anchorY="middle"
      >
        {char}
        <meshStandardMaterial color={color} metalness={.25} roughness={.32}/>
      </Text>;
    })}
  </group>;
};
