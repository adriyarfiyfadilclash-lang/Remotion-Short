import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props = {
  shape?: "circle" | "square" | "rounded" | "pill" | "diamond" | "triangle";
  size?: number; color?: string; duration?: number; delay?: number;
  rotate?: number; style?: React.CSSProperties;
};
export const FlatShape: React.FC<Props> = ({
  shape="circle", size=180, color="#2563EB", duration=18, delay=0, rotate=0, style={}
}) => {
  const f=useCurrentFrame();
  const p=interpolate(f,[delay,delay+duration],[0,1],{
    extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.back(1.25))
  });
  const radius = shape==="circle" ? "50%" : shape==="rounded" ? "28%" : shape==="pill" ? "999px" : "0";
  const clip = shape==="triangle" ? "polygon(50% 0, 0 100%, 100% 100%)" :
    shape==="diamond" ? "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)" : undefined;
  return <div style={{
    width:size,height:size,flexShrink:0,backgroundColor:color,borderRadius:radius,
    clipPath:clip,transform:`scale(${p}) rotate(${rotate*p}deg)`,
    ...style
  }}/>;
};
