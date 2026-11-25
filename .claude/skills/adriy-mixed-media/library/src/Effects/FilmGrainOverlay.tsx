import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props={opacity?:number;size?:number;delay?:number;animate?:boolean;blend?:"soft-light"|"overlay"|"multiply"};

/** Fine film-grain texture overlay for an analog editorial finish. */
export const FilmGrainOverlay:React.FC<Props>=({opacity=.12,size=4,delay=0,animate=true,blend="soft-light"})=>{
 const f=useCurrentFrame()-delay; const pulse=animate?(.82+.18*Math.sin(f*2.3)):1;
 return <AbsoluteFill style={{pointerEvents:"none",opacity:opacity*pulse,mixBlendMode:blend,backgroundImage:"repeating-radial-gradient(circle at 20% 30%,#fff 0 .55px,transparent .8px 3px),repeating-radial-gradient(circle at 70% 60%,#000 0 .5px,transparent .8px 4px)",backgroundSize:`${size*2}px ${size*2}px`}}/>;
};
