import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props = { children?: React.ReactNode; duration?: number; delay?: number; direction?: "left"|"right"|"up"|"down"; background?: string; scale?: number };

/** Slides a full scene into frame with a slight photographic push-in. */
export const PhotoSlideTransition: React.FC<Props> = ({children,duration=22,delay=0,direction="right",background="#17191f",scale=1.06}) => {
  const f=useCurrentFrame()-delay;
  const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  const startX=direction==="right"?100:direction==="left"?-100:0;
  const startY=direction==="down"?-100:direction==="up"?100:0;
  return <AbsoluteFill style={{overflow:"hidden",background}}>
    <AbsoluteFill style={{transform:`translate(${startX*(1-p)}%,${startY*(1-p)}%) scale(${interpolate(p,[0,1],[scale,1])})`,opacity:p}}>
      {children}
    </AbsoluteFill>
  </AbsoluteFill>;
};
