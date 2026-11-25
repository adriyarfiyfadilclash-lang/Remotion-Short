import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

type Props = { text: string; color?: string; accent?: string; fontSize?: number; duration?: number };
export const FlatTitleReveal: React.FC<Props> = ({text,color="#111827",accent="#2563EB",fontSize=92,duration=22}) => {
 const f=useCurrentFrame();
 const y=interpolate(f,[0,duration],[70,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.cubic)});
 const opacity=interpolate(f,[0,5],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 return <AbsoluteFill style={{justifyContent:"center",alignItems:"center",overflow:"hidden"}}>
  <div style={{fontFamily:"Arial, sans-serif",fontWeight:900,fontSize,color,lineHeight:1.02,letterSpacing:-3,opacity,transform:`translateY(${y}px)`,textAlign:"center"}}>
   {text}<span style={{color:accent}}>.</span>
  </div>
 </AbsoluteFill>;
};
