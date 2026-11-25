import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props={children?:React.ReactNode;amount?:number;delay?:number;duration?:number;accentA?:string;accentB?:string;active?:boolean};

/** Subtle RGB channel-style offset for a brief analog-video imperfection. */
export const ChromaticOffset:React.FC<Props>=({children,amount=5,delay=0,duration=18,accentA="#ff3158",accentB="#32d8dc",active=true})=>{
 const f=useCurrentFrame()-delay; const p=interpolate(f,[0,duration],[1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 const shift=active&&f>=0?amount*p:0;
 return <AbsoluteFill>
  <AbsoluteFill style={{opacity:1}}>{children}</AbsoluteFill>
  {shift>0&&<>
   <AbsoluteFill style={{pointerEvents:"none",opacity:.2*p,mixBlendMode:"screen",transform:`translateX(${-shift}px)`,filter:`drop-shadow(${shift}px 0 0 ${accentA})`}}>{children}</AbsoluteFill>
   <AbsoluteFill style={{pointerEvents:"none",opacity:.16*p,mixBlendMode:"screen",transform:`translateX(${shift}px)`,filter:`drop-shadow(${-shift}px 0 0 ${accentB})`}}>{children}</AbsoluteFill>
  </>}
 </AbsoluteFill>;
};
