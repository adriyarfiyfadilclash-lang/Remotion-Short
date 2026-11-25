import React from "react";
import { useCurrentFrame } from "remotion";

type Props={children:React.ReactNode;amplitude?:number;period?:number;rotation?:number;phase?:number};
export const PaperFloat:React.FC<Props>=({children,amplitude=12,period=90,rotation=1.5,phase=0})=>{
 const f=useCurrentFrame();
 const angle=((f+phase)/period)*Math.PI*2;
 const y=Math.sin(angle)*amplitude;
 const r=Math.sin(angle*.7)*rotation;
 return <div style={{transform:`translateY(${y}px) rotate(${r}deg)`}}>{children}</div>;
};
