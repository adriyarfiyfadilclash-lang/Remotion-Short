import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type Props={children:React.ReactNode;amount?:number;speed?:number};
export const FlatPulse:React.FC<Props>=({children,amount=0.06,speed=30})=>{
 const f=useCurrentFrame();
 const scale=1+Math.sin((f/speed)*Math.PI*2)*amount;
 return <div style={{width:"100%",height:"100%",transform:`scale(${scale})`}}>{children}</div>;
};
