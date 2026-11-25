import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Item={children:React.ReactNode;color?:string;rotation?:number};
type Props={items:Item[];gap?:number;duration?:number;offset?:number;shadow?:number};
export const PaperStack:React.FC<Props>=({items,gap=14,duration=18,offset=10,shadow=10})=>{
 const f=useCurrentFrame();
 return <div style={{position:"relative",display:"inline-grid"}}>
  {items.map((item,i)=>{
   const p=interpolate(f,[i*5,i*5+duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.back(1.1))});
   return <div key={i} style={{gridArea:"1/1",background:item.color??"#F7F0E0",padding:gap,
    boxShadow:`0 ${shadow}px ${shadow*1.5}px rgba(40,30,15,.18)`,
    transform:`translate(${(items.length-i-1)*offset}px,${(items.length-i-1)*offset}px) rotate(${(item.rotation??0)+(1-p)*-4}deg) scale(${.96+.04*p})`,
    opacity:p}}>{item.children}</div>;
  })}
 </div>;
};
