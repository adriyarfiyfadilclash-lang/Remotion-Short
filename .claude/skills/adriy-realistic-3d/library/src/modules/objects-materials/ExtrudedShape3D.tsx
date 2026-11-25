import React from "react";
import * as THREE from "three";

type Props={
  points?:[number,number][];
  depth?:number;
  color?:string;
  bevelEnabled?:boolean;
  position?:[number,number,number];
  rotation?:[number,number,number];
  scale?:number;
};

const defaultPoints:[number,number][]=[[-1,-.6],[.55,-.6],[1,.1],[.35,.8],[-.8,.65]];
export const ExtrudedShape3D:React.FC<Props>=({
  points=defaultPoints,depth=.25,color="#D18B59",bevelEnabled=true,
  position=[0,0,0],rotation=[0,0,0],scale=1
})=>{
  const shape=React.useMemo(()=>{
    const s=new THREE.Shape();
    points.forEach(([x,y],i)=>i===0?s.moveTo(x,y):s.lineTo(x,y));
    s.closePath();
    return s;
  },[points]);
  const bevel=bevelEnabled?{bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.045,bevelThickness:.04}:{bevelEnabled:false};
  return <mesh position={position} rotation={rotation} scale={scale} castShadow receiveShadow>
    <extrudeGeometry args={[shape,{depth,curveSegments:16,...bevel}]}/>
    <meshPhysicalMaterial color={color} roughness={.34} metalness={.12} clearcoat={.4}/>
  </mesh>;
};
