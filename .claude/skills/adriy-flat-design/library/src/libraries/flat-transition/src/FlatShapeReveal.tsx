import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

type Props={children:React.ReactNode;color?:string;duration?:number;shape?:"circle"|"square"|"diamond"};
export const FlatShapeReveal:React.FC<Props>=({children,color="#7C3AED",duration=24,shape="diamond"})=>{
 const f=useCurrentFrame(); const {width,height}=useVideoConfig();
 const p=interpolate(f,[0,duration],[0,150],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.cubic)});
 const clip=shape==="circle"?`circle(${p}% at 50% 50%)`:shape==="square"?`inset(${50-p/2}% ${50-p/2}%)`:`polygon(50% ${50-p/2}%,${50+p/2}% 50%,50% ${50+p/2}%,${50-p/2}% 50%)`;
 return <AbsoluteFill style={{backgroundColor:color,overflow:"hidden"}}>
  <AbsoluteFill style={{clipPath:clip}}>{children}</AbsoluteFill>
 </AbsoluteFill>;
};
