import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

type Props = { children: React.ReactNode; color?: string; duration?: number; reverse?: boolean };
export const FlatCircleIris: React.FC<Props> = ({ children, color="#111827", duration=26, reverse=false }) => {
  const frame=useCurrentFrame(); const {width,height}=useVideoConfig();
  const p=interpolate(frame,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.inOut(Easing.cubic)});
  const radius=Math.hypot(width,height)*p*1.1;
  const mask=`circle(${reverse ? Math.hypot(width,height)*1.1-radius : radius}px at 50% 50%)`;
  return <AbsoluteFill style={{backgroundColor:color}}>
    <AbsoluteFill style={{clipPath:mask}}>{children}</AbsoluteFill>
  </AbsoluteFill>;
};
