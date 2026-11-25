import React from "react";
import {Text} from "@react-three/drei";

type Props={
  text:string;
  fontSize?:number;
  color?:string;
  metalness?:number;
  roughness?:number;
  letterSpacing?:number;
  anchorX?:"left"|"center"|"right";
  anchorY?:"top"|"middle"|"bottom";
  position?:[number,number,number];
  rotation?:[number,number,number];
};

export const Metallic3DText:React.FC<Props>=({
  text,fontSize=1,color="#C7D5E5",metalness=.8,roughness=.22,
  letterSpacing=0,anchorX="center",anchorY="middle",position=[0,0,0],rotation=[0,0,0]
})=>(
  <Text
    position={position}
    rotation={rotation}
    fontSize={fontSize}
    letterSpacing={letterSpacing}
    anchorX={anchorX}
    anchorY={anchorY}
  >
    {text}
    <meshPhysicalMaterial color={color} metalness={metalness} roughness={roughness} clearcoat={1}/>
  </Text>
);
