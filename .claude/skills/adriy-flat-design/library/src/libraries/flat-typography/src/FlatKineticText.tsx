import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

type Props={text:string;color?:string;fontSize?:number;stagger?:number;duration?:number};
export const FlatKineticText:React.FC<Props>=({text,color="#0F172A",fontSize=72,stagger=2,duration=14})=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{justifyContent:"center",alignItems:"center"}}>
  <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",fontFamily:"Arial,sans-serif",fontWeight:900,fontSize,color,lineHeight:1.1}}>
   {Array.from(text).map((char,i)=>{
    const start=i*stagger;
    const y=interpolate(f,[start,start+duration],[34,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.back(1.2))});
    const opacity=interpolate(f,[start,start+5],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
    return <span key={`${char}-${i}`} style={{display:"inline-block",whiteSpace:char===" "?"pre":"normal",transform:`translateY(${y}px)`,opacity}}>{char===" "?"\u00a0":char}</span>;
   })}
  </div>
 </AbsoluteFill>;
};
