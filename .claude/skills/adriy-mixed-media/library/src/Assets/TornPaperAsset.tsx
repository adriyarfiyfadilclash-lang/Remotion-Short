import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type Props={x?:number;y?:number;width?:number;height?:number;color?:string;children?:React.ReactNode;rotate?:number;delay?:number;roughness?:number;shadow?:boolean};

/** Irregular paper sheet with a torn-edge silhouette. */
export const TornPaperAsset:React.FC<Props>=({x=0,y=0,width=420,height=300,color="#eee5d4",children,rotate=-2,delay=0,roughness=5,shadow=true})=>{
 const f=useCurrentFrame()-delay; const p=interpolate(f,[0,14],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 const r=Math.max(1,Math.min(10,roughness));
 const clip=`polygon(${r}% 1%,${18+r/2}% 0%,${34}% 1.5%,${51}% 0%,${68}% 1.2%,${84}% 0%,99% 2%,100% 18%,98.5% 35%,100% 52%,98.8% 70%,100% 87%,98% 100%,80% 98.5%,62% 100%,43% 98.8%,24% 100%,2% 98%,1% 80%,0% 61%,1.5% 42%,0% 22%)`;
 return <div style={{position:"absolute",left:x,top:y,width,height,background:color,clipPath:clip,opacity:p,transform:`translateY(${(1-p)*22}px) rotate(${rotate}deg)`,boxShadow:shadow?"0 15px 28px rgba(0,0,0,.25)":undefined,overflow:"hidden"}}>
  <div style={{position:"absolute",inset:0,opacity:.12,backgroundImage:"repeating-linear-gradient(0deg,transparent 0 4px,rgba(80,60,30,.2) 5px)"}}/>
  <div style={{position:"relative",height:"100%",padding:22,boxSizing:"border-box"}}>{children}</div>
 </div>;
};
