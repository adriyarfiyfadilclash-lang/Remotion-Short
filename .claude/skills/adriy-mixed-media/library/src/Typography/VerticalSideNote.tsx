import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type Props={text:string;x?:number;y?:number;color?:string;fontSize?:number;delay?:number;side?:"left"|"right";height?:number;tracking?:number};

/** Vertical editorial side note for magazine-like framing. */
export const VerticalSideNote:React.FC<Props>=({text,x=0,y=0,color="#e9e1d2",fontSize=13,delay=0,side="left",height=420,tracking=3})=>{
 const f=useCurrentFrame()-delay; const p=interpolate(f,[0,14],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 return <div style={{position:"absolute",left:x,top:y,height,writingMode:"vertical-rl",transform:`rotate(${side==="left"?180:0}deg) translateX(${(1-p)*18}px)`,opacity:p,color,fontFamily:"Arial,sans-serif",fontSize,fontWeight:800,letterSpacing:tracking,textTransform:"uppercase",borderLeft:`2px solid ${color}`,paddingLeft:10}}>{text}</div>;
};
