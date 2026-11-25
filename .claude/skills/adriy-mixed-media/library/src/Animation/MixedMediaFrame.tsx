import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props = { children?: React.ReactNode; label?: string; x?: number; y?: number; width?: number; height?: number; borderColor?: string; delay?: number; rotation?: number };

/** A restrained frame treatment to make mixed-source assets feel intentionally art-directed. */
export const MixedMediaFrame: React.FC<Props> = ({children,label,x=0,y=0,width=520,height=320,borderColor="#f2b84b",delay=0,rotation=0}) => {
  const f=useCurrentFrame()-delay;
  const p=interpolate(f,[0,15],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  return <div style={{position:"absolute",left:x,top:y,width,height,boxSizing:"border-box",padding:10,border:`2px solid ${borderColor}`,background:"rgba(15,17,22,.25)",opacity:p,transform:`translateY(${(1-p)*20}px) rotate(${rotation}deg)`,boxShadow:"0 15px 30px rgba(0,0,0,.2)"}}>
    {label && <div style={{position:"absolute",top:-28,left:0,fontFamily:"Arial,sans-serif",fontSize:12,fontWeight:800,letterSpacing:2,color:borderColor}}>{label}</div>}
    <AbsoluteFill style={{inset:10,overflow:"hidden"}}>{children}</AbsoluteFill>
  </div>;
};
