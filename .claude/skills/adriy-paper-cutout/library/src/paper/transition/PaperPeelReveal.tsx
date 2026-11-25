import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props={children:React.ReactNode;duration?:number;corner?:"top-left"|"top-right"|"bottom-left"|"bottom-right";paperColor?:string};
export const PaperPeelReveal:React.FC<Props>=({children,duration=30,corner="top-left",paperColor="#F8F1DF"})=>{
 const f=useCurrentFrame();
 const p=interpolate(f,[0,duration],[0,100],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.inOut(Easing.cubic)});
 const points={
  "top-left":`0 0, ${p}% 0, 0 ${p}%`,
  "top-right":`100% 0, ${100-p}% 0, 100% ${p}%`,
  "bottom-left":`0 100%, ${p}% 100%, 0 ${100-p}%`,
  "bottom-right":`100% 100%, ${100-p}% 100%, 100% ${100-p}%`
 };
 return <div style={{position:"relative",width:"100%",height:"100%",overflow:"hidden",background:paperColor}}>
  <div style={{position:"absolute",inset:0}}>{children}</div>
  <div style={{position:"absolute",inset:0,background:paperColor,clipPath:`polygon(${points[corner]})`,filter:"drop-shadow(8px 8px 6px rgba(45,32,15,.25))"}}/>
 </div>;
};
