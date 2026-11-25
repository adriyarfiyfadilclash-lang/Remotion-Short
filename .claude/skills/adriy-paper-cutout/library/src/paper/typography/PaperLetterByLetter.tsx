import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props={text:string;color?:string;fontSize?:number;stagger?:number;duration?:number;paperColor?:string};
export const PaperLetterByLetter:React.FC<Props>=({text,color="#493D2E",fontSize=68,stagger=2,duration=14,paperColor="#F8F1DF"})=>{
 const f=useCurrentFrame();
 return <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",fontFamily:"Georgia,serif",fontWeight:900,fontSize,color}}>
  {Array.from(text).map((char,i)=>{
   const start=i*stagger;
   const p=interpolate(f,[start,start+duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.back(1.3))});
   return <span key={`${char}-${i}`} style={{display:"inline-block",whiteSpace:char===" "?"pre":"normal",padding:char===" "?0:"0 1px",background:paperColor,boxShadow:char===" "?undefined:"0 3px 5px rgba(50,35,15,.12)",marginRight:char===" "?8:2,transform:`translateY(${(1-p)*32}px) rotate(${(1-p)*(i%2?5:-5)}deg)`,opacity:p}}>{char===" "?"\u00a0":char}</span>;
  })}
 </div>;
};
