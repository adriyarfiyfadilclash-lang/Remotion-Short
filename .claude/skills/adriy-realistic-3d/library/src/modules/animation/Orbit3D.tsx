import React from "react";
import {useCurrentFrame} from "remotion";
import * as THREE from "three";

type Props={children:React.ReactNode;radius?:number;speed?:number;startAngle?:number;plane?:"xy"|"xz"|"yz";center?:[number,number,number];startFrame?:number};

export const Orbit3D:React.FC<Props>=({children,radius=2,speed=30,startAngle=0,plane="xz",center=[0,0,0],startFrame=0})=>{
 const frame=useCurrentFrame();
 const ref=React.useRef<THREE.Group>(null);
 const a=THREE.MathUtils.degToRad(startAngle+((frame-startFrame)/30)*speed);
 const x=plane==="yz"?0:Math.cos(a)*radius;
 const y=plane==="xy"?Math.sin(a)*radius:plane==="yz"?Math.cos(a)*radius:0;
 const z=plane==="xz"?Math.sin(a)*radius:plane==="yz"?Math.sin(a)*radius:0;
 React.useLayoutEffect(()=>{if(ref.current) ref.current.position.set(center[0]+x,center[1]+y,center[2]+z);},[x,y,z,center[0],center[1],center[2]]);
 return <group ref={ref}>{children}</group>;
};
