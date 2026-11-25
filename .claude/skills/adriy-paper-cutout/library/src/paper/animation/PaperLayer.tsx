import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props = {
  children: React.ReactNode;
  color?: string;
  padding?: number;
  radius?: number;
  shadow?: number;
  texture?: boolean;
  duration?: number;
  delay?: number;
  style?: React.CSSProperties;
};

export const PaperLayer: React.FC<Props> = ({
  children, color="#F8F1DF", padding=28, radius=3, shadow=12,
  texture=false, duration=20, delay=0, style={}
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay+duration], [0,1], {
    extrapolateLeft:"clamp", extrapolateRight:"clamp", easing:Easing.out(Easing.back(1.12))
  });
  return (
    <div style={{
      position:"relative", display:"inline-block", boxSizing:"border-box",
      backgroundColor:color, padding, borderRadius:radius,
      boxShadow:`0 ${shadow}px ${shadow*1.8}px rgba(55,42,24,.20), 0 2px 3px rgba(55,42,24,.12)`,
      transform:`translateY(${(1-p)*34}px) rotate(${(1-p)*-2}deg) scale(${.96+.04*p})`,
      opacity:p, ...style
    }}>
      {texture && <div style={{position:"absolute",inset:0,pointerEvents:"none",opacity:.09,
        backgroundImage:"repeating-linear-gradient(0deg, transparent 0 3px, rgba(90,70,40,.18) 4px, transparent 5px 8px)"}}/>}
      <div style={{position:"relative"}}>{children}</div>
    </div>
  );
};
