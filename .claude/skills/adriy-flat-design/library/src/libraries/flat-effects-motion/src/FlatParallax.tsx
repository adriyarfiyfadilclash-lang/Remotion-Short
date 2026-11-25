import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

type Layer={content:React.ReactNode;depth?:number};
type Props={layers:Layer[];duration?:number;direction?:"left"|"right"|"up"|"down";distance?:number};
export const FlatParallax:React.FC<Props>=({layers,duration=60,direction="left",distance=90})=>{
 const f=useCurrentFrame(); const {width,height}=useVideoConfig();
 const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.inOut(Easing.quad)});
 return <div style={{position:"relative",width,height,overflow:"hidden"}}>
  {layers.map((layer,i)=>{
   const d=layer.depth??(i+1);
   const sign=direction==="right"||direction==="down"?-1:1;
   const x=direction==="left"||direction==="right"?-sign*distance*p*d/Math.max(layers.length,1):0;
   const y=direction==="up"||direction==="down"?-sign*distance*p*d/Math.max(layers.length,1):0;
   return <div key={i} style={{position:"absolute",inset:0,transform:`translate(${x}px,${y}px)`}}>{layer.content}</div>;
  })}
 </div>;
};
