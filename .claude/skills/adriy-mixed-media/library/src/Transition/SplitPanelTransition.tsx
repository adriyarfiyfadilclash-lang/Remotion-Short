import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props = { children?: React.ReactNode; duration?: number; delay?: number; panels?: number; gap?: number; background?: string; direction?: "horizontal"|"vertical" };

/** Reveals the scene in staggered editorial panels. */
export const SplitPanelTransition: React.FC<Props> = ({children,duration=24,delay=0,panels=4,gap=3,background="#17191f",direction="horizontal"}) => {
  const f=useCurrentFrame()-delay;
  const count=Math.max(2,Math.min(8,panels));
  const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  return <AbsoluteFill style={{overflow:"hidden",background}}>
    {Array.from({length:count},(_,i)=>{
      const local=interpolate(f,[i*3,duration+i*3],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
      const inset=(1-local)*100;
      const clip=direction==="horizontal" ? (i%2===0?`inset(0 ${inset}% 0 0)`:`inset(0 0 0 ${inset}%)`) : (i%2===0?`inset(0 0 ${inset}% 0)`:`inset(${inset}% 0 0 0)`);
      const size=100/count;
      return <div key={i} style={{position:"absolute",left:direction==="horizontal"?`${i*size}%`:0,top:direction==="vertical"?`${i*size}%`:0,width:direction==="horizontal"?`${size}%`:"100%",height:direction==="vertical"?`${size}%`:"100%",overflow:"hidden",clipPath:clip}}>
        <div style={{position:"absolute",left:direction==="horizontal"?`${-i*100}%`:0,top:direction==="vertical"?`${-i*100}%`:0,width:direction==="horizontal"?`${count*100}%`:"100%",height:direction==="vertical"?`${count*100}%`:"100%"}}>{children}</div>
      </div>;
    })}
    {gap>0 && <AbsoluteFill style={{pointerEvents:"none",opacity:p<1?1:0,background:direction==="horizontal"?`repeating-linear-gradient(90deg,transparent 0 ${100/count-gap/2}%,${background} ${100/count-gap/2}% ${100/count-gap/2+gap/100}%)`:`repeating-linear-gradient(0deg,transparent 0 ${100/count-gap/2}%,${background} ${100/count-gap/2}% ${100/count-gap/2+gap/100}%)`}}/>}
  </AbsoluteFill>;
};
