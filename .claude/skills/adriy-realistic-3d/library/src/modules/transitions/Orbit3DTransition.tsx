import React from "react";
import {useCurrentFrame} from "remotion";
import * as THREE from "three";

type Props={children:React.ReactNode;startFrame?:number;duration?:number;radius?:number;turns?:number;axis?:"x"|"y"|"z"};
export const Orbit3DTransition:React.FC<Props>=({children,startFrame=0,duration=48,radius=3,turns=1,axis="y"})=>{
 const frame=useCurrentFrame();
 const t=THREE.MathUtils.clamp((frame-startFrame)/Math.max(1,duration),0,1);
 const e=t*t*(3-2*t);
 const a=(1-e)*Math.PI*2*turns;
 const pos: [number,number,number]=axis==="y"?[Math.sin(a)*radius,0,Math.cos(a)*radius]:axis==="x"?[0,Math.sin(a)*radius,Math.cos(a)*radius]:[Math.sin(a)*radius,Math.cos(a)*radius,0];
 const scale=THREE.MathUtils.lerp(.2,1,e);
 return <group position={pos} scale={scale}>{children}</group>;
};
