import React, { useMemo } from "react";
export type StarField3DProps={count?:number;radius?:number;seed?:number;color?:string;size?:number;opacity?:number};
/** Medan bintang dengan sebaran deterministik untuk render Remotion. */
export const StarField3D:React.FC<StarField3DProps>=({count=900,radius=28,seed=17,color="#dceeff",size=0.045,opacity=0.9})=>{
 const positions=useMemo(()=>{let s=seed>>>0;const rand=()=>{s=(1664525*s+1013904223)>>>0;return s/4294967296;};const a:number[]=[];for(let i=0;i<count;i++){const u=rand()*2-1,t=rand()*Math.PI*2,r=Math.sqrt(1-u*u)*radius;a.push(r*Math.cos(t),u*radius,r*Math.sin(t));}return new Float32Array(a);},[count,radius,seed]);
 return <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions,3]}/></bufferGeometry><pointsMaterial color={color} size={size} transparent opacity={opacity} sizeAttenuation depthWrite={false}/></points>;
};