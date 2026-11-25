import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props={size?:number;color?:string;duration?:number;delay?:number;rotation?:number};
export const FlatBlob:React.FC<Props>=({size=260,color="#F59E0B",duration=24,delay=0,rotation=0})=>{
 const f=useCurrentFrame();
 const p=interpolate(f,[delay,delay+duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.cubic)});
 return <div style={{
  width:size,height:size,backgroundColor:color,
  borderRadius:"42% 58% 63% 37% / 43% 39% 61% 57%",
  transform:`scale(${p}) rotate(${rotation*p}deg)`
 }}/>;
};
