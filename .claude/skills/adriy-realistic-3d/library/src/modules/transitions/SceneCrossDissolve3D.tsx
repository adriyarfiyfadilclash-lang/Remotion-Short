import React from "react";
import {useCurrentFrame} from "remotion";
import * as THREE from "three";

type Props={children:React.ReactNode;startFrame?:number;duration?:number;fromOpacity?:number;toOpacity?:number;scaleFrom?:number};
export const SceneCrossDissolve3D:React.FC<Props>=({children,startFrame=0,duration=30,fromOpacity=0,toOpacity=1,scaleFrom=.96})=>{
 const frame=useCurrentFrame();
 const ref=React.useRef<THREE.Group>(null);
 const t=THREE.MathUtils.clamp((frame-startFrame)/Math.max(1,duration),0,1);
 const e=t*t*(3-2*t);
 const opacity=THREE.MathUtils.lerp(fromOpacity,toOpacity,e);
 const scale=THREE.MathUtils.lerp(scaleFrom,1,e);
 React.useLayoutEffect(()=>{
  ref.current?.traverse((obj)=>{
   if(!(obj instanceof THREE.Mesh)) return;
   const materials=Array.isArray(obj.material)?obj.material:[obj.material];
   materials.forEach((material)=>{
    material.transparent=true;
    material.opacity=opacity;
    material.needsUpdate=true;
   });
  });
 },[opacity]);
 return <group ref={ref} scale={scale}>{children}</group>;
};
