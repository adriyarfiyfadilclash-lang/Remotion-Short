import React from "react";
import { Img, interpolate, useCurrentFrame } from "remotion";

type Props = { src: string; x?: number; y?: number; width?: number; height?: number; rotate?: number; fromY?: number; delay?: number; shadow?: boolean; fit?: "cover" | "contain"; border?: string; radius?: number };

/** A photo or transparent PNG cutout with a subtle editorial entrance. */
export const PhotoCutout: React.FC<Props> = ({ src, x=0, y=0, width=420, height=520, rotate=-3, fromY=48, delay=0, shadow=true, fit="contain", border, radius=4 }) => {
  const frame = useCurrentFrame() - delay;
  const progress = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lift = interpolate(progress, [0, 1], [fromY, 0]);
  const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <div style={{ position:"absolute", left:x, top:y, width, height, opacity, transform:`translateY(${lift}px) rotate(${rotate}deg)`, transformOrigin:"center", filter:shadow?"drop-shadow(0 18px 20px rgba(0,0,0,.32))":undefined, border:border?`${border}`:undefined, borderRadius:radius, overflow:"hidden" }}>
    <Img src={src} style={{ width:"100%", height:"100%", objectFit:fit, display:"block" }} />
  </div>;
};
