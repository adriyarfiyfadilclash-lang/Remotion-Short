import React from "react";
import { Img, interpolate, useCurrentFrame } from "remotion";

type Props = { src: string; x?: number; y?: number; width?: number; height?: number; delay?: number; amplitude?: number; speed?: number; rotate?: number; depth?: number; opacity?: number };

/** Slowly drifting media layer. Keep motion deterministic for frame-accurate rendering. */
export const FloatingMedia: React.FC<Props> = ({src,x=0,y=0,width=300,height=220,delay=0,amplitude=12,speed=.045,rotate=0,depth=1,opacity=1}) => {
  const f=useCurrentFrame()-delay;
  const p=interpolate(f,[0,14],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  const drift=Math.sin(Math.max(0,f)*speed)*amplitude;
  return <div style={{position:"absolute",left:x,top:y,width,height,opacity:opacity*p,transform:`translate3d(0,${drift}px,${depth*10}px) rotate(${rotate}deg)`,filter:"drop-shadow(0 14px 22px rgba(0,0,0,.3))"}}>
    <Img src={src} style={{width:"100%",height:"100%",objectFit:"contain"}} />
  </div>;
};
