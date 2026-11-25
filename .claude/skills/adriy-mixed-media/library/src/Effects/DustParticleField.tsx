import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

type Props={count?:number;color?:string;opacity?:number;speed?:number;seed?:number;size?:number};

/** Deterministic drifting dust motes; no random calls during rendering. */
export const DustParticleField:React.FC<Props>=({count=28,color="#f5d9a4",opacity=.45,speed=.55,seed=7,size=3})=>{
 const f=useCurrentFrame(); const n=Math.max(0,Math.min(100,count));
 return <AbsoluteFill style={{pointerEvents:"none",overflow:"hidden"}}>
  {Array.from({length:n},(_,i)=>{
   const x=((i*73.17+seed*19)%100); const y=((i*41.73+seed*11)%100);
   const drift=(f*speed*(.35+(i%5)*.16))%125;
   const dx=Math.sin(f*.018+i*2.1)*(8+(i%4)*5);
   const s=size*(.45+(i%4)*.3);
   return <div key={i} style={{position:"absolute",left:`${(x+dx/10+100)%100}%`,top:`${(y-drift+125)%125}%`,width:s,height:s,borderRadius:"50%",background:color,opacity:opacity*(.45+(i%5)*.11),filter:"blur(.5px)",boxShadow:`0 0 ${s*3}px ${color}`}}/>;
  })}
 </AbsoluteFill>;
};
