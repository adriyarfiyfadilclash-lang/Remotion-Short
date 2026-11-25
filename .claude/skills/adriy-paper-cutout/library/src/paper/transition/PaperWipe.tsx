import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props={children:React.ReactNode;color?:string;duration?:number;direction?:"left"|"right"|"up"|"down"};
export const PaperWipe:React.FC<Props>=({children,color="#E8DCC3",duration=26,direction="left"})=>{
 const f=useCurrentFrame();
 const p=interpolate(f,[0,duration],[0,100],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.inOut(Easing.cubic)});
 const clip=direction==="left"?`inset(0 ${100-p}% 0 0)`:
  direction==="right"?`inset(0 0 0 ${100-p}%)`:
  direction==="up"?`inset(0 0 ${100-p}% 0)`:`inset(${100-p}% 0 0 0)`;
 return <div style={{position:"relative",width:"100%",height:"100%",overflow:"hidden",background:color}}>
  <div style={{position:"absolute",inset:0,clipPath:clip,background:"#F8F1DF",boxShadow:"0 8px 20px rgba(55,42,24,.18)"}}>{children}</div>
  <div style={{position:"absolute",inset:0,pointerEvents:"none",opacity:p<100?1:0,
   ...(direction==="left"?{left:`${p}%`,width:12,top:0,bottom:0}:direction==="right"?{right:`${p}%`,width:12,top:0,bottom:0}:direction==="up"?{top:`${p}%`,height:12,left:0,right:0}:{bottom:`${p}%`,height:12,left:0,right:0}),
   background:"linear-gradient(90deg,rgba(90,70,40,.25),rgba(255,255,255,.8),rgba(90,70,40,.12))"}}/>
 </div>;
};
