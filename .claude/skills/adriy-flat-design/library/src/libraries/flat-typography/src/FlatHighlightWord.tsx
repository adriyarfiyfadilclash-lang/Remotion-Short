import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

type Props={before?:string;word:string;after?:string;highlight?:string;color?:string;fontSize?:number;duration?:number};
export const FlatHighlightWord:React.FC<Props>=({before="",word,after="",highlight="#FDE047",color="#111827",fontSize=64,duration=16})=>{
 const f=useCurrentFrame();
 const width=interpolate(f,[0,duration],[0,100],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.cubic)});
 return <AbsoluteFill style={{justifyContent:"center",alignItems:"center"}}>
  <div style={{fontFamily:"Arial,sans-serif",fontSize,fontWeight:800,color,textAlign:"center",lineHeight:1.2}}>
   {before}<span style={{position:"relative",display:"inline-block",padding:"0 8px"}}>
    <span style={{position:"absolute",left:0,bottom:"5%",height:"34%",width:`${width}%`,backgroundColor:highlight,zIndex:0}}/>
    <span style={{position:"relative",zIndex:1}}>{word}</span>
   </span>{after}
  </div>
 </AbsoluteFill>;
};
