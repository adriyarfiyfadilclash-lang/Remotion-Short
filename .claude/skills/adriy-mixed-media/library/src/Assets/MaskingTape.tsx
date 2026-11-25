import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type Props={x?:number;y?:number;width?:number;height?:number;color?:string;rotate?:number;delay?:number;opacity?:number;pattern?:"plain"|"stripe"|"grid"};

/** Decorative masking tape strip for pinning paper and photographs. */
export const MaskingTape:React.FC<Props>=({x=0,y=0,width=150,height=34,color="#d8c69b",rotate=-8,delay=0,opacity=.88,pattern="plain"})=>{
 const f=useCurrentFrame()-delay; const p=interpolate(f,[0,9],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 const bg=pattern==="stripe"?`repeating-linear-gradient(135deg,${color} 0 8px,rgba(255,255,255,.22) 8px 12px)`:pattern==="grid"?`repeating-linear-gradient(0deg,transparent 0 7px,rgba(80,60,30,.14) 8px),repeating-linear-gradient(90deg,${color} 0 7px,rgba(255,255,255,.15) 8px 9px)`:color;
 return <div style={{position:"absolute",left:x,top:y,width,height,background:bg,opacity:opacity*p,transform:`rotate(${rotate}deg)`,clipPath:"polygon(2% 5%,98% 0,100% 95%,1% 100%)",boxShadow:"0 3px 7px rgba(0,0,0,.12)"}}/>;
};
