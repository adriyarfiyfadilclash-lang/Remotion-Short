import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props = { children?: React.ReactNode; duration?: number; delay?: number; intensity?: number; accent?: string; background?: string };

/** Brief editorial glitch with offset color bands; deterministic and render-safe. */
export const MixedMediaGlitchTransition: React.FC<Props> = ({children,duration=18,delay=0,intensity=18,accent="#ef6b4a",background="#17191f"}) => {
  const f=useCurrentFrame()-delay;
  const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  const active=f>=0 && f<duration;
  const jitter=active?Math.sin(f*12)*intensity*(1-p):0;
  return <AbsoluteFill style={{overflow:"hidden",background}}>
    <AbsoluteFill style={{opacity:p,transform:`translateX(${jitter}px)`}}>{children}</AbsoluteFill>
    {active && <>
      <AbsoluteFill style={{background:accent,opacity:(1-p)*.22,mixBlendMode:"screen",transform:`translateX(${-jitter*1.7}px)`,clipPath:`inset(${(f*17)%78}% 0 ${((f*23)+18)%72}% 0)`}}/>
      <AbsoluteFill style={{background:"#42d7d0",opacity:(1-p)*.16,mixBlendMode:"screen",transform:`translateX(${jitter*1.2}px)`,clipPath:`inset(${((f*29)+12)%80}% 0 ${((f*11)+8)%70}% 0)`}}/>
    </>}
  </AbsoluteFill>;
};
