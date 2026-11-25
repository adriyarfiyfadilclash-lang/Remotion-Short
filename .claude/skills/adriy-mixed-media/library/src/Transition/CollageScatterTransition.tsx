import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props = { children?: React.ReactNode; duration?: number; delay?: number; tiles?: number; background?: string; seed?: number };

/** Builds the scene from a deterministic grid of moving collage tiles. */
export const CollageScatterTransition: React.FC<Props> = ({children,duration=28,delay=0,tiles=8,background="#17191f",seed=3}) => {
  const f=useCurrentFrame()-delay;
  const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  const count=Math.max(2,Math.min(16,tiles));
  return <AbsoluteFill style={{overflow:"hidden",background}}>
    <AbsoluteFill>{children}</AbsoluteFill>
    {p<1 && Array.from({length:count},(_,i)=>{
      const angle=(i*137.5+seed*29)*Math.PI/180;
      const distance=(1-p)*115;
      const x=Math.cos(angle)*distance;
      const y=Math.sin(angle)*distance;
      const rotate=(1-p)*(i%2?18:-18);
      return <div key={i} style={{position:"absolute",left:`${(i%4)*25}%`,top:`${Math.floor(i/4)*50}%`,width:"25%",height:"50%",background,transform:`translate(${x}px,${y}px) rotate(${rotate}deg)`,transformOrigin:"center",opacity:1-p,border:"1px solid rgba(255,255,255,.08)"}}/>;
    })}
  </AbsoluteFill>;
};
