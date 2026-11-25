import React from "react";
import {interpolate,useCurrentFrame} from "remotion";

type Props={color?:string;opacity?:number;delay?:number;duration?:number;direction?:"left"|"right";style?:React.CSSProperties};
export const PaperLightLeak:React.FC<Props>=({color="#F5C77C",opacity=.22,delay=0,duration=70,direction="left",style})=>{
 const frame=useCurrentFrame();
 const x=interpolate(frame,[delay,delay+duration],[direction==="left"?-70:170,direction==="left"?170:-70],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 const a=interpolate(frame,[delay,delay+8,delay+duration-8,delay+duration],[0,opacity,opacity,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 return <div style={{position:"absolute",inset:0,pointerEvents:"none",background:`linear-gradient(105deg, transparent 25%, ${color} 48%, transparent 70%)`,mixBlendMode:"screen",opacity:a,transform:`translateX(${x}%)`,...style}}/>;
};
