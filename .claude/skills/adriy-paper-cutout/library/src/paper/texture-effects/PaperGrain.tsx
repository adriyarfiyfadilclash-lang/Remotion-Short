import React from "react";
import {useCurrentFrame} from "remotion";

type Props={opacity?:number;seed?:number;style?:React.CSSProperties};
export const PaperGrain:React.FC<Props>=({opacity=.13,seed=1,style})=>{
 const frame=useCurrentFrame();
 const dots=Array.from({length:180},(_,i)=>({x:(i*73+seed*19)%1000,y:(i*137+seed*31)%560,r:((i*7)%10)/10+.35}));
 return <svg viewBox="0 0 1000 560" preserveAspectRatio="none" style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",opacity,...style}}>
  {dots.map((d,i)=><circle key={i} cx={d.x} cy={d.y} r={d.r} fill={((i+frame)%3===0)?"#fff":"#4D4030"}/>)}
 </svg>;
};
