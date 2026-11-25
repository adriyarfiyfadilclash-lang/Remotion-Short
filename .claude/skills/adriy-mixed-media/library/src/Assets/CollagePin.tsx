import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type Props={x?:number;y?:number;size?:number;color?:string;delay?:number;rotate?:number;style?:"round"|"pushpin"};

/** Small pin or tack graphic to visually attach paper assets to a board. */
export const CollagePin:React.FC<Props>=({x=0,y=0,size=24,color="#d34f3d",delay=0,rotate=0,style="round"})=>{
 const f=useCurrentFrame()-delay; const p=interpolate(f,[0,8],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 return <div style={{position:"absolute",left:x,top:y,width:size,height:size,borderRadius:style==="round"?"50%":"45% 45% 50% 50%",background:`radial-gradient(circle at 32% 28%,#fff9 ${0}%,${color} 38%,#4a2420 100%)`,boxShadow:"2px 4px 6px rgba(0,0,0,.3)",opacity:p,transform:`scale(${.5+.5*p}) rotate(${rotate}deg)`,zIndex:20}}>
  <div style={{position:"absolute",width:size*.18,height:size*.72,left:"41%",top:"70%",background:"#777",transform:"rotate(18deg)",transformOrigin:"top",borderRadius:4,boxShadow:"1px 1px 2px #222"}}/>
 </div>;
};
