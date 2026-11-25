import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

type Props={from:React.ReactNode;to:React.ReactNode;duration?:number;background?:string};
export const FlatZoomCut:React.FC<Props>=({from,to,duration=20,background="#111827"})=>{
 const f=useCurrentFrame();
 const out=interpolate(f,[0,duration*.5],[1,1.7],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.in(Easing.quad)});
 const inn=interpolate(f,[duration*.5,duration],[.7,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.quad)});
 const showTo=f>=duration*.5;
 return <AbsoluteFill style={{backgroundColor:background,overflow:"hidden"}}>
  <AbsoluteFill style={{transform:`scale(${out})`,opacity:showTo?0:1}}>{from}</AbsoluteFill>
  <AbsoluteFill style={{transform:`scale(${inn})`,opacity:showTo?1:0}}>{to}</AbsoluteFill>
 </AbsoluteFill>;
};
