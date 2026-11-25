import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props={text:string;color?:string;fontSize?:number;lineHeight?:number;duration?:number;maxWidth?:number;paperColor?:string};
export const PaperParagraph:React.FC<Props>=({text,color="#514431",fontSize=30,lineHeight=1.5,duration=30,maxWidth=1100,paperColor="#F8F1DF"})=>{
 const f=useCurrentFrame();
 const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.cubic)});
 return <div style={{maxWidth,background:paperColor,padding:"32px 42px",boxShadow:"0 8px 18px rgba(55,42,24,.16)",fontFamily:"Georgia,serif",fontSize,lineHeight,color,opacity:p,transform:`translateY(${(1-p)*25}px)`}}>{text}</div>;
};
