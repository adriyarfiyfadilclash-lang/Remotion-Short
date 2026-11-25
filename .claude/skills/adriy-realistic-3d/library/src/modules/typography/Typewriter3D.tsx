import React from "react";
import {Text} from "@react-three/drei";
import {useCurrentFrame} from "remotion";

type Props={
  text:string;
  fontSize?:number;
  color?:string;
  charsPerSecond?:number;
  startFrame?:number;
  position?:[number,number,number];
  anchorX?:"left"|"center"|"right";
};

export const Typewriter3D:React.FC<Props>=({
  text,fontSize=.45,color="#EAF0F6",charsPerSecond=18,startFrame=0,
  position=[0,0,0],anchorX="left"
})=>{
  const frame=useCurrentFrame();
  const count=Math.max(0,Math.min(text.length,Math.floor(Math.max(0,frame-startFrame)/30*charsPerSecond)));
  return <Text position={position} fontSize={fontSize} color={color} anchorX={anchorX} anchorY="middle">
    {text.slice(0,count)}
    <meshStandardMaterial color={color} roughness={.55}/>
  </Text>;
};
