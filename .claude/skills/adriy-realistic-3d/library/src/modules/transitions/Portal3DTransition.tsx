import React from "react";
import {useCurrentFrame} from "remotion";
import * as THREE from "three";

type Props={children:React.ReactNode;startFrame?:number;duration?:number;maxRadius?:number;color?:string;ringThickness?:number};
export const Portal3DTransition:React.FC<Props>=({children,startFrame=0,duration=36,maxRadius=4,color="#70C8D8",ringThickness=.08})=>{
 const frame=useCurrentFrame();
 const t=THREE.MathUtils.clamp((frame-startFrame)/Math.max(1,duration),0,1);
 const e=1-Math.pow(1-t,3);
 const radius=THREE.MathUtils.lerp(.02,maxRadius,e);
 const opacity=1-e;
 return <>
  <group scale={THREE.MathUtils.lerp(.05,1,e)}>{children}</group>
  <mesh position={[0,0,.15]} scale={radius}>
   <torusGeometry args={[1,ringThickness,12,96]}/>
   <meshBasicMaterial color={color} transparent opacity={opacity} />
  </mesh>
 </>;
};
