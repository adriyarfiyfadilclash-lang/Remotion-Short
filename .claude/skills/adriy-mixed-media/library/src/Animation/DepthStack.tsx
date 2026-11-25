import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type Layer = { color: string; label?: string; offsetX?: number; offsetY?: number; depth?: number };
type Props = { layers: Layer[]; x?: number; y?: number; width?: number; height?: number; gap?: number; delay?: number; tilt?: number };

/** Stacks graphic layers at varied depths to create a tactile 2.5D collage. */
export const DepthStack: React.FC<Props> = ({ layers, x=0, y=0, width=520, height=300, gap=14, delay=0, tilt=-2 }) => {
  const f=useCurrentFrame()-delay;
  const p=interpolate(f,[0,22],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  return <div style={{position:"absolute",left:x,top:y,width,height,transform:`rotate(${tilt}deg)`,perspective:900}}>
    {layers.map((layer,i)=>{const d=layer.depth ?? i; const spread=(1-p)*(layers.length-i)*18; return <div key={i} style={{position:"absolute",inset:0,background:layer.color,transform:`translate3d(${(layer.offsetX??0)+spread}px, ${(layer.offsetY??0)+spread}px, ${d*8}px)`,boxShadow:"0 12px 18px rgba(0,0,0,.18)",border:"1px solid rgba(255,255,255,.18)",display:"grid",placeItems:"center",opacity:p}}>
      {layer.label && <span style={{fontFamily:"Arial,sans-serif",fontWeight:900,fontSize:26,color:"rgba(255,255,255,.9)",letterSpacing:2}}>{layer.label}</span>}
    </div>;})}
  </div>;
};
