import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type Props={text:string;x?:number;y?:number;width?:number;fontSize?:number;color?:string;accent?:string;delay?:number;rotate?:number;align?:"left"|"center"|"right";fontFamily?:string;letterSpacing?:number};

/** Oversized editorial title with staggered word reveal and a color accent. */
export const EditorialTitle:React.FC<Props>=({text,x=0,y=0,width=900,fontSize=92,color="#f4f0e8",accent="#ef6b4a",delay=0,rotate=-1,align="left",fontFamily="Arial,sans-serif",letterSpacing=-2})=>{
 const f=useCurrentFrame()-delay; const words=text.split(" ");
 return <div style={{position:"absolute",left:x,top:y,width,color,fontFamily,fontSize,fontWeight:900,lineHeight:.9,letterSpacing, textAlign:align,transform:`rotate(${rotate}deg)`}}>
  <div style={{display:"flex",flexWrap:"wrap",gap:"0 .22em",justifyContent:align==="left"?"flex-start":align==="right"?"flex-end":"center"}}>
   {words.map((w,i)=>{const p=interpolate(f,[i*4,i*4+13],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});return <span key={i} style={{display:"inline-block",opacity:p,transform:`translateY(${(1-p)*34}px)`,color:i===words.length-1?accent:color}}>{w}</span>;})}
  </div>
 </div>;
};
