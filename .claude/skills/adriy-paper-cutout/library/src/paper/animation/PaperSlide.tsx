import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

type Props={children:React.ReactNode;direction?:"left"|"right"|"up"|"down";duration?:number;delay?:number;distance?:number};
export const PaperSlide:React.FC<Props>=({children,direction="left",duration=22,delay=0,distance=700})=>{
 const f=useCurrentFrame(); const {width,height}=useVideoConfig();
 const d=distance || (direction==="left"||direction==="right"?width:height);
 const p=interpolate(f,[delay,delay+duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.cubic)});
 const x=direction==="left"?d*(1-p):direction==="right"?-d*(1-p):0;
 const y=direction==="up"?d*(1-p):direction==="down"?-d*(1-p):0;
 return <div style={{transform:`translate(${x}px,${y}px)`,opacity:p}}>{children}</div>;
};
