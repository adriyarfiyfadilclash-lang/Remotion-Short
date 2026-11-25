import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props={children:React.ReactNode;duration?:number;direction?:"left"|"right"|"top"|"bottom";background?:string};
export const PaperTearReveal:React.FC<Props>=({children,duration=30,direction="left",background="#E8DCC3"})=>{
 const f=useCurrentFrame();
 const p=interpolate(f,[0,duration],[0,100],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.inOut(Easing.cubic)});
 const clip=direction==="left"?`inset(0 ${100-p}% 0 0)`:
  direction==="right"?`inset(0 0 0 ${100-p}%)`:
  direction==="top"?`inset(0 0 ${100-p}% 0)`:`inset(${100-p}% 0 0 0)`;
 const edge=direction==="left"?`polygon(0 0, 100% 0, ${p}% 100%, 0 100%)`:"none";
 return <div style={{position:"relative",width:"100%",height:"100%",overflow:"hidden",background}}>
  <div style={{position:"absolute",inset:0,clipPath:clip}}>{children}</div>
  <div style={{position:"absolute",pointerEvents:"none",opacity:p<100?1:0,
   left:direction==="left"?`${p}%`:undefined,right:direction==="right"?`${p}%`:undefined,
   top:direction==="top"?`${p}%`:direction==="bottom"?`${p}%`:undefined,
   width:direction==="left"||direction==="right"?18:"100%",
   height:direction==="top"||direction==="bottom"?18:"100%",
   background:"linear-gradient(90deg, rgba(255,255,255,.65), rgba(125,95,55,.18))",
   transform:direction==="top"||direction==="bottom"?"rotate(0deg)":"skewY(-5deg)"
  }}/>
 </div>;
};
