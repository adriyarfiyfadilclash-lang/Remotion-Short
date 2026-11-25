import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type Props={children:React.ReactNode;color?:string;blur?:number;opacity?:number;speed?:number};
export const FlatGlow:React.FC<Props>=({children,color="#60A5FA",blur=24,opacity=.45,speed=45})=>{
 const f=useCurrentFrame();
 const pulse=.72+.28*Math.sin((f/speed)*Math.PI*2);
 return <div style={{width:"100%",height:"100%",filter:`drop-shadow(0 0 ${blur}px ${color})`,opacity:Math.min(1,opacity*pulse+1-opacity)}}>{children}</div>;
};
