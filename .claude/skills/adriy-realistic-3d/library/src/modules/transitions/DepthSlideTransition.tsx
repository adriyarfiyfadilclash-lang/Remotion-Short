import React from "react";
import {useCurrentFrame} from "remotion";
import * as THREE from "three";

type Props={children:React.ReactNode;direction?:"left"|"right"|"up"|"down";startFrame?:number;duration?:number;distance?:number;depth?:number};
export const DepthSlideTransition:React.FC<Props>=({children,direction="right",startFrame=0,duration=32,distance=5,depth=-1.5})=>{
 const frame=useCurrentFrame();
 const t=THREE.MathUtils.clamp((frame-startFrame)/Math.max(1,duration),0,1);
 const e=t*t*(3-2*t);
 const sign=direction==="left"?-1:direction==="up"?1:1;
 const x=direction==="left"||direction==="right"?THREE.MathUtils.lerp(sign*distance,0,e):0;
 const y=direction==="up"||direction==="down"?THREE.MathUtils.lerp(direction==="up"?distance:-distance,0,e):0;
 const z=THREE.MathUtils.lerp(depth,0,e);
 return <group position={[x,y,z]}>{children}</group>;
};
