import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props={color?:string;width?:number;thickness?:number;direction?:"right"|"left"|"up"|"down";duration?:number};
export const FlatArrow:React.FC<Props>=({color="#111827",width=220,thickness=12,direction="right",duration=18})=>{
 const f=useCurrentFrame();
 const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.cubic)});
 const rotation=direction==="right"?0:direction==="down"?90:direction==="left"?180:-90;
 return <div style={{width,height:thickness,backgroundColor:color,position:"relative",transform:`rotate(${rotation}deg) scaleX(${p})`,transformOrigin:"left center"}}>
  <div style={{position:"absolute",right:-2,top:"50%",width:thickness*2.5,height:thickness*2.5,borderTop:`${thickness}px solid ${color}`,borderRight:`${thickness}px solid ${color}`,transform:"translateY(-50%) rotate(45deg)"}}/>
 </div>;
};
