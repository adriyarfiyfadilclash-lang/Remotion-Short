import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type Props={text:string;x?:number;y?:number;fontSize?:number;color?:string;stroke?:string;delay?:number;rotate?:number;spacing?:number;weight?:number};

/** Oversized cutout-style lettering with offset paper shadow and outline. */
export const CutoutLetter:React.FC<Props>=({text,x=0,y=0,fontSize=110,color="#ef6b4a",stroke="#f4f0e8",delay=0,rotate=2,spacing=-5,weight=900})=>{
 const f=useCurrentFrame()-delay; const p=interpolate(f,[0,16],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 const style:React.CSSProperties={fontFamily:"Arial Black,Arial,sans-serif",fontSize,fontWeight:weight,letterSpacing:spacing,lineHeight:.85,WebkitTextStroke:`2px ${stroke}`,color,textShadow:"7px 7px 0 rgba(0,0,0,.24)",whiteSpace:"pre-line"};
 return <div style={{position:"absolute",left:x,top:y,opacity:p,transform:`translateY(${(1-p)*24}px) rotate(${rotate}deg)`,...style}}>{text}</div>;
};
