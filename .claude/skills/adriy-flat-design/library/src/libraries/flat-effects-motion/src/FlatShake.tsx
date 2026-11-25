import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props={children:React.ReactNode;intensity?:number;duration?:number;frequency?:number};
export const FlatShake:React.FC<Props>=({children,intensity=12,duration=18,frequency=5})=>{
 const f=useCurrentFrame();
 const fade=interpolate(f,[0,duration],[1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.quad)});
 const x=Math.sin(f*frequency)*intensity*fade;
 const y=Math.cos(f*frequency*1.3)*intensity*.55*fade;
 return <div style={{width:"100%",height:"100%",transform:`translate(${x}px,${y}px)`}}>{children}</div>;
};
