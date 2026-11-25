import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props={delay?:number;duration?:number;intensity?:number;color?:string;children?:React.ReactNode};

/** Short camera-flash overlay for a photo snap or hard editorial cut. */
export const CameraFlash:React.FC<Props>=({delay=0,duration=8,intensity=.9,color="#fff8e8",children})=>{
 const f=useCurrentFrame()-delay;
 const opacity=f<0||f>duration?0:interpolate(f,[0,1,Math.max(2,duration*.35),duration],[0,intensity,intensity*.22,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 return <AbsoluteFill>
  {children}
  <AbsoluteFill style={{pointerEvents:"none",background:color,opacity}}/>
 </AbsoluteFill>;
};
