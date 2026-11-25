import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

type Props={from:React.ReactNode;to:React.ReactNode;duration?:number;direction?:"left"|"right"|"up"|"down";background?:string};
export const FlatSlideSwap:React.FC<Props>=({from,to,duration=24,direction="left",background="#FFFFFF"})=>{
 const f=useCurrentFrame(); const {width,height}=useVideoConfig();
 const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.inOut(Easing.cubic)});
 const x=direction==="left"?-width*p:direction==="right"?width*p:0;
 const y=direction==="up"?-height*p:direction==="down"?height*p:0;
 const enterX=direction==="left"?width*(1-p):direction==="right"?-width*(1-p):0;
 const enterY=direction==="up"?height*(1-p):direction==="down"?-height*(1-p):0;
 return <AbsoluteFill style={{backgroundColor:background,overflow:"hidden"}}>
  <AbsoluteFill style={{transform:`translate(${x}px,${y}px)`}}>{from}</AbsoluteFill>
  <AbsoluteFill style={{transform:`translate(${enterX}px,${enterY}px)`}}>{to}</AbsoluteFill>
 </AbsoluteFill>;
};
