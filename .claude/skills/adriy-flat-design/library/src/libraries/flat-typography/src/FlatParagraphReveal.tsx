import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

type Props={text:string;color?:string;fontSize?:number;lineHeight?:number;duration?:number;maxWidth?:number};
export const FlatParagraphReveal:React.FC<Props>=({text,color="#334155",fontSize=34,lineHeight=1.45,duration=30,maxWidth=1200})=>{
 const f=useCurrentFrame();
 const opacity=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.quad)});
 const y=interpolate(f,[0,duration],[24,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.cubic)});
 return <AbsoluteFill style={{justifyContent:"center",alignItems:"center",padding:80}}>
  <div style={{maxWidth,fontFamily:"Arial,sans-serif",fontSize,fontWeight:500,lineHeight,color,opacity,transform:`translateY(${y}px)`}}>{text}</div>
 </AbsoluteFill>;
};
