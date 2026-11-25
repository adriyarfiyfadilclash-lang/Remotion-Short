import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props={before?:string;word:string;after?:string;highlight?:string;color?:string;fontSize?:number;duration?:number};
export const PaperWordHighlight:React.FC<Props>=({before="",word,after="",highlight="#E9C46A",color="#443827",fontSize=62,duration=18})=>{
 const f=useCurrentFrame();
 const p=interpolate(f,[0,duration],[0,100],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.cubic)});
 return <div style={{fontFamily:"Georgia,serif",fontSize,fontWeight:900,color,textAlign:"center",lineHeight:1.25}}>
  {before}<span style={{position:"relative",display:"inline-block",padding:"0 8px"}}>
   <span style={{position:"absolute",left:0,bottom:"7%",height:"30%",width:`${p}%`,background:highlight,transform:"rotate(-1.5deg)"}}/>
   <span style={{position:"relative"}}>{word}</span>
  </span>{after}
 </div>;
};
