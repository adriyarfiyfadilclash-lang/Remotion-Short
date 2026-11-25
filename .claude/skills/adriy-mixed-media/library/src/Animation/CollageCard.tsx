import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type Props = { title?: string; subtitle?: string; image?: string; x?: number; y?: number; width?: number; height?: number; color?: string; accent?: string; rotate?: number; index?: string; delay?: number };

/** Editorial collage tile with a bold number, image field and caption. */
export const CollageCard: React.FC<Props> = ({ title="ARSIP VISUAL", subtitle="Catatan dari masa lalu", image, x=0, y=0, width=360, height=300, color="#e9e1d2", accent="#e85d3f", rotate=2, index="01", delay=0 }) => {
  const f=useCurrentFrame()-delay;
  const p=interpolate(f,[0,20],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  return <div style={{position:"absolute",left:x,top:y,width,height,background:color,color:"#171717",padding:18,boxSizing:"border-box",transform:`translateY(${(1-p)*35}px) rotate(${rotate}deg)`,opacity:p,boxShadow:"0 16px 32px rgba(0,0,0,.28)",display:"flex",flexDirection:"column",gap:10}}>
    <div style={{display:"flex",justifyContent:"space-between",fontFamily:"Arial,sans-serif",fontSize:12,fontWeight:800,letterSpacing:2}}><span>{title}</span><span style={{color:accent}}>{index}</span></div>
    {image ? <img src={image} style={{width:"100%",height:"65%",objectFit:"cover",filter:"saturate(.82)"}} /> : <div style={{height:"65%",background:`linear-gradient(135deg, ${accent}, #24242a)`,display:"grid",placeItems:"center",color:"white",fontSize:54,fontWeight:900}}>{index}</div>}
    <div style={{fontFamily:"Arial,sans-serif",fontSize:16,fontWeight:700,lineHeight:1.15}}>{subtitle}</div>
  </div>;
};
