import React from "react";
import {useCurrentFrame} from "remotion";
import * as THREE from "three";

type Props={children:React.ReactNode;axis?:"x"|"y";startFrame?:number;duration?:number;fromDegrees?:number;toDegrees?:number};
export const Flip3DTransition:React.FC<Props>=({children,axis="y",startFrame=0,duration=36,fromDegrees=90,toDegrees=0})=>{
 const frame=useCurrentFrame();
 const t=THREE.MathUtils.clamp((frame-startFrame)/Math.max(1,duration),0,1);
 const e=t*t*(3-2*t);
 const angle=THREE.MathUtils.degToRad(THREE.MathUtils.lerp(fromDegrees,toDegrees,e));
 const rotation: [number,number,number]=axis==="x"?[angle,0,0]:[0,angle,0];
 return <group rotation={rotation}>{children}</group>;
};
