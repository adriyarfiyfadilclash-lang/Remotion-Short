import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props={rows?:number;columns?:number;gap?:number;dotSize?:number;color?:string;stagger?:number};
export const FlatDotGrid:React.FC<Props>=({rows=5,columns=7,gap=18,dotSize=12,color="#CBD5E1",stagger=1})=>{
 const f=useCurrentFrame();
 return <div style={{display:"grid",gridTemplateColumns:`repeat(${columns}, ${dotSize}px)`,gap}}>
  {Array.from({length:rows*columns},(_,i)=>{
   const p=interpolate(f,[i*stagger,i*stagger+10],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.back(1.4))});
   return <div key={i} style={{width:dotSize,height:dotSize,borderRadius:"50%",backgroundColor:color,transform:`scale(${p})`}}/>;
  })}
 </div>;
};
