import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

type Props={to:number;from?:number;prefix?:string;suffix?:string;color?:string;fontSize?:number;duration?:number;decimals?:number};
export const FlatNumberCounter:React.FC<Props>=({to,from=0,prefix="",suffix="",color="#111827",fontSize=88,duration=45,decimals=0})=>{
 const f=useCurrentFrame();
 const value=interpolate(f,[0,duration],[from,to],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.quad)});
 return <AbsoluteFill style={{justifyContent:"center",alignItems:"center"}}>
  <div style={{fontFamily:"Arial,sans-serif",fontSize,fontWeight:900,color,fontVariantNumeric:"tabular-nums"}}>{prefix}{value.toFixed(decimals)}{suffix}</div>
 </AbsoluteFill>;
};
