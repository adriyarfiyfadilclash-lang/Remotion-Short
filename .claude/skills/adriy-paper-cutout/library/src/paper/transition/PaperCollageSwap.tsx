import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props={from:React.ReactNode;to:React.ReactNode;duration?:number;direction?:"left"|"right"|"up"|"down";paperColor?:string};
export const PaperCollageSwap:React.FC<Props>=({from,to,duration=28,direction="left",paperColor="#E8DCC3"})=>{
 const f=useCurrentFrame();
 const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.inOut(Easing.cubic)});
 const fromX=direction==="left"?-100*p:direction==="right"?100*p:0;
 const fromY=direction==="up"?-100*p:direction==="down"?100*p:0;
 const toX=direction==="left"?100*(1-p):direction==="right"?-100*(1-p):0;
 const toY=direction==="up"?100*(1-p):direction==="down"?-100*(1-p):0;
 const rot=(1-p)*4;
 return <div style={{position:"relative",width:"100%",height:"100%",overflow:"hidden",background:paperColor}}>
  <div style={{position:"absolute",inset:0,transform:`translate(${fromX}%,${fromY}%) rotate(${rot}deg)`,opacity:1-p}}>{from}</div>
  <div style={{position:"absolute",inset:0,transform:`translate(${toX}%,${toY}%) rotate(${-rot}deg)`,opacity:p}}>{to}</div>
 </div>;
};
