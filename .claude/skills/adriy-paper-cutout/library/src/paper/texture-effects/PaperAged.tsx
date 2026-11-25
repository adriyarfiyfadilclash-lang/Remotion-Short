import React from "react";
import {interpolate,useCurrentFrame} from "remotion";

type Props={opacity?:number;vignette?:number;warmth?:number;delay?:number;style?:React.CSSProperties};
export const PaperAged:React.FC<Props>=({opacity=.22,vignette=.28,warmth=.14,delay=0,style})=>{
 const frame=useCurrentFrame();
 const p=interpolate(frame,[delay,delay+18],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 return <div style={{position:"absolute",inset:0,pointerEvents:"none",opacity:p,...style}}>
  <div style={{position:"absolute",inset:0,background:`rgba(173,117,57,${warmth})`}}/>
  <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at center, transparent 45%, rgba(72,48,27,${vignette}) 100%)`}}/>
  <div style={{position:"absolute",inset:0,boxShadow:`inset 0 0 45px rgba(130,86,42,${opacity})`}}/>
 </div>;
};
