import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props={text:string;color?:string;paperColor?:string;fontSize?:number;duration?:number;delay?:number;rotation?:number};
export const PaperTitle:React.FC<Props>=({text,color="#443827",paperColor="#F8F1DF",fontSize=88,duration=22,delay=0,rotation=-1.5})=>{
 const f=useCurrentFrame();
 const p=interpolate(f,[delay,delay+duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.back(1.12))});
 return <div style={{display:"inline-block",background:paperColor,padding:"20px 34px",boxShadow:"0 9px 18px rgba(55,42,24,.18)",transform:`translateY(${(1-p)*55}px) rotate(${rotation*(1-p)}deg)`,opacity:p}}>
  <div style={{fontFamily:"Georgia,serif",fontWeight:900,fontSize,color,lineHeight:1.05,letterSpacing:-2}}>{text}</div>
 </div>;
};
