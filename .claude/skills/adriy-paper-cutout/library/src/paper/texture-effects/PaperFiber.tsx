import React from "react";

type Props={opacity?:number;color?:string;count?:number;seed?:number;style?:React.CSSProperties};
export const PaperFiber:React.FC<Props>=({opacity=.12,color="#6E5A43",count=90,seed=2,style})=>{
 const lines=Array.from({length:count},(_,i)=>({x:(i*83+seed*17)%1000,y:(i*149+seed*23)%560,w:5+(i*11)%24,dy:((i*7)%9)-4}));
 return <svg viewBox="0 0 1000 560" preserveAspectRatio="none" style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",opacity,...style}}>
  {lines.map((l,i)=><path key={i} d={`M${l.x} ${l.y} l${l.w} ${l.dy}`} stroke={color} strokeWidth={i%4===0?1.2:.65} strokeLinecap="round"/>)}
 </svg>;
};
