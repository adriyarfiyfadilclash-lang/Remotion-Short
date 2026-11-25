import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props={children:React.ReactNode;duration?:number;delay?:number;distance?:number;rotation?:number};
export const PaperDrop:React.FC<Props>=({children,duration=24,delay=0,distance=260,rotation=12})=>{
 const f=useCurrentFrame();
 const p=interpolate(f,[delay,delay+duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.bounce)});
 const y=interpolate(p,[0,1],[ -distance,0 ]);
 const r=interpolate(p,[0,1],[rotation,0]);
 return <div style={{transform:`translateY(${y}px) rotate(${r}deg)`,opacity:interpolate(p,[0,.12,1],[0,1,1])}}>{children}</div>;
};
