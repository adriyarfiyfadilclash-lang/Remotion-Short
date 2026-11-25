import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

type Props={children:React.ReactNode; color?:string; duration?:number; axis?:"horizontal"|"vertical"};
export const FlatSplitReveal:React.FC<Props>=({children,color="#F59E0B",duration=24,axis="horizontal"})=>{
 const f=useCurrentFrame(); const {width,height}=useVideoConfig();
 const p=interpolate(f,[0,duration],[50,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.inOut(Easing.cubic)});
 const clip=axis==="horizontal"?`inset(0 ${p}% 0 ${p}%)`:`inset(${p}% 0 ${p}% 0)`;
 const bar=axis==="horizontal"?{height:"100%",width:`${p*2}%`,left:`${50-p}%`,top:0}:{width:"100%",height:`${p*2}%`,top:`${50-p}%`,left:0};
 return <AbsoluteFill style={{backgroundColor:color,overflow:"hidden"}}>
   <AbsoluteFill style={{clipPath:clip}}>{children}</AbsoluteFill>
   <AbsoluteFill style={{...bar,backgroundColor:color,pointerEvents:"none",opacity:p>0?1:0}}/>
 </AbsoluteFill>;
};
