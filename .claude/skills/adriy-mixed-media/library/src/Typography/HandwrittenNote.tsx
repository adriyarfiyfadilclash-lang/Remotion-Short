import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type Props={text:string;x?:number;y?:number;color?:string;fontSize?:number;delay?:number;rotate?:number;width?:number;underline?:boolean};

/** Casual handwritten-style note, best paired with paper textures or photo cutouts. */
export const HandwrittenNote:React.FC<Props>=({text,x=0,y=0,color="#292722",fontSize=28,delay=0,rotate=-3,width=500,underline=true})=>{
 const f=useCurrentFrame()-delay; const p=interpolate(f,[0,22],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 return <div style={{position:"absolute",left:x,top:y,width,color,fontFamily:"'Comic Sans MS','Bradley Hand',cursive",fontSize,lineHeight:1.2,opacity:p,transform:`rotate(${rotate}deg)`,whiteSpace:"pre-wrap"}}>
  {text}
  {underline&&<div style={{height:3,width:`${p*78}%`,background:color,marginTop:5,borderRadius:8,transform:"rotate(-1deg)"}}/>}
 </div>;
};
