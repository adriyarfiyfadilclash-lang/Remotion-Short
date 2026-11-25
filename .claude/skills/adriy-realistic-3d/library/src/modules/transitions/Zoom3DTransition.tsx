import React from "react";
import {useCurrentFrame} from "remotion";
import * as THREE from "three";

type Props={children:React.ReactNode;startFrame?:number;duration?:number;fromScale?:number;toScale?:number;fromZ?:number;toZ?:number};
export const Zoom3DTransition:React.FC<Props>=({children,startFrame=0,duration=30,fromScale=.15,toScale=1,fromZ=-4,toZ=0})=>{
 const frame=useCurrentFrame();
 const t=THREE.MathUtils.clamp((frame-startFrame)/Math.max(1,duration),0,1);
 const e=1-Math.pow(1-t,3);
 const scale=THREE.MathUtils.lerp(fromScale,toScale,e);
 const z=THREE.MathUtils.lerp(fromZ,toZ,e);
 return <group position={[0,0,z]} scale={scale}>{children}</group>;
};
