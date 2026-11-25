import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props={x?:number;y?:number;size?:number;opacity?:number;delay?:number;duration?:number;color?:string;softness?:number;children?:React.ReactNode};

/** Soft spotlight overlay that directs attention to a chosen collage element. */
export const SpotlightFocus:React.FC<Props>=({x=50,y=45,size=420,opacity=.65,delay=0,duration=30,color="#fff2cf",softness=45,children})=>{
 const f=useCurrentFrame()-delay;
 const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 return <AbsoluteFill style={{pointerEvents:"none"}}>
  <AbsoluteFill style={{background:`radial-gradient(circle ${size}px at ${x}% ${y}%, transparent 0 ${Math.max(5,size-softness)}px, rgba(0,0,0,${opacity*p}) ${size}px)`}}/>
  <AbsoluteFill style={{background:`radial-gradient(circle ${size*.72}px at ${x}% ${y}%, ${color}12, transparent 75%)`,mixBlendMode:"screen"}}/>
  {children}
 </AbsoluteFill>;
};
