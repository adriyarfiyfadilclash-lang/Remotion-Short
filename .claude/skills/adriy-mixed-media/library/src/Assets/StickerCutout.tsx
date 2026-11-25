import React from "react";
import { Img, interpolate, useCurrentFrame } from "remotion";

type Props={src:string;x?:number;y?:number;width?:number;height?:number;delay?:number;rotate?:number;outline?:string;outlineWidth?:number;shadow?:boolean;fit?:"contain"|"cover"};

/** Transparent sticker/PNG asset with a white die-cut style border. */
export const StickerCutout:React.FC<Props>=({src,x=0,y=0,width=260,height=260,delay=0,rotate=4,outline="#fff8e9",outlineWidth=8,shadow=true,fit="contain"})=>{
 const f=useCurrentFrame()-delay; const p=interpolate(f,[0,16],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 return <div style={{position:"absolute",left:x,top:y,width,height,opacity:p,transform:`scale(${.82+.18*p}) rotate(${rotate}deg)`,filter:shadow?"drop-shadow(0 12px 14px rgba(0,0,0,.3))":undefined}}>
  <div style={{position:"absolute",inset:0,background:outline,transform:`scale(${1+outlineWidth/Math.max(width,height)*2})`,borderRadius:"18%"}}/>
  <Img src={src} style={{position:"relative",width:"100%",height:"100%",objectFit:fit,filter:`drop-shadow(0 0 0 ${outline})`}}/>
 </div>;
};
