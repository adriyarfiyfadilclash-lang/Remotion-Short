import React from "react";
import {useCurrentFrame} from "remotion";
import * as THREE from "three";

type Props={children:React.ReactNode;from?:number;to?:number;startFrame?:number;duration?:number;overshoot?:number};

export const Scale3D:React.FC<Props>=({children,from=.01,to=1,startFrame=0,duration=24,overshoot=0})=>{
 const frame=useCurrentFrame();
 const raw=THREE.MathUtils.clamp((frame-startFrame)/Math.max(1,duration),0,1);
 const eased=1-Math.pow(1-raw,3);
 const bounce=overshoot*Math.sin(raw*Math.PI)*(1-raw);
 const value=THREE.MathUtils.lerp(from,to,eased)+bounce;
 return <group scale={value}>{children}</group>;
};
