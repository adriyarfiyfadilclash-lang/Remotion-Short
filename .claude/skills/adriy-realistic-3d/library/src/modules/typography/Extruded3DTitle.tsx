import React from "react";
import {Text3D} from "@react-three/drei";
import * as THREE from "three";

type Props={
  text:string;
  font:string;
  size?:number;
  height?:number;
  color?:string;
  bevelEnabled?:boolean;
  bevelThickness?:number;
  bevelSize?:number;
  position?:[number,number,number];
  rotation?:[number,number,number];
  curveSegments?:number;
};

export const Extruded3DTitle:React.FC<Props>=({
  text,font,size=1,height=.18,color="#D9E2EC",bevelEnabled=true,
  bevelThickness=.025,bevelSize=.018,position=[0,0,0],rotation=[0,0,0],curveSegments=12
})=>(
  <Text3D
    font={font}
    size={size}
    height={height}
    curveSegments={curveSegments}
    bevelEnabled={bevelEnabled}
    bevelThickness={bevelThickness}
    bevelSize={bevelSize}
    bevelSegments={4}
    position={position}
    rotation={rotation}
  >
    {text}
    <meshPhysicalMaterial color={color} metalness={.62} roughness={.24} clearcoat={1}/>
  </Text3D>
);
