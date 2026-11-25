import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import {
 WayangSmokeEffect, AncientDustEffect, WarFireEffect, ShadowParticleEffect,
 GoldenSparkEffect, AtmosphericFogEffect, ParchmentTextureEffect
} from "../src/index";

const Scene:React.FC<{label:string;children:React.ReactNode}> = ({label,children}) => (
 <AbsoluteFill style={{background:"#17110b",alignItems:"center",justifyContent:"center"}}>
  <AbsoluteFill style={{background:"radial-gradient(ellipse,#f1e5ca,#bda77f)",inset:"12%"}}/>
  <div style={{position:"absolute",top:55,color:"#e4c58d",fontFamily:"Georgia,serif",fontSize:26,letterSpacing:5}}>{label}</div>
  <div style={{position:"absolute",width:360,height:480,top:"24%"}}>
   <svg viewBox="0 0 300 420" width="100%" height="100%">
    <g fill="#050505" stroke="#a9854d" strokeWidth="3">
     <path d="M150 15 C120 60 120 90 150 115 C180 90 180 60 150 15Z"/>
     <path d="M115 110 L85 155 L100 240 L115 350 L150 380 L185 350 L200 240 L215 155 L185 110Z"/>
     <path d="M115 130 L55 185 L45 255 L65 260 L105 210 L140 170Z"/>
     <path d="M185 130 L245 185 L255 255 L235 260 L195 210 L160 170Z"/>
    </g>
    <g fill="none" stroke="#d7b77b" strokeWidth="3"><path d="M125 140 Q150 160 175 140 M120 195 Q150 215 180 195"/><circle cx="150" cy="235" r="15"/></g>
   </svg>
  </div>
  {children}
 </AbsoluteFill>
);

export const WayangEffectsShowcase:React.FC=()=>{
 const frame=useCurrentFrame();
 const index=Math.min(6,Math.floor(frame/75));
 const labels=["WAYANG SMOKE","ANCIENT DUST","WAR FIRE","SHADOW PARTICLES","GOLDEN SPARKS","ATMOSPHERIC FOG","PARCHMENT TEXTURE"];
 const base=<Scene label={labels[index]}><div style={{position:"absolute",bottom:55,color:"#d7bd8b",letterSpacing:4,fontFamily:"Georgia,serif"}}>ADRIY.PROJECT • SEJARAH NUSANTARA</div></Scene>;
 switch(index){
  case 0:return <WayangSmokeEffect seed={7}>{base}</WayangSmokeEffect>;
  case 1:return <AncientDustEffect count={55}>{base}</AncientDustEffect>;
  case 2:return <WarFireEffect x={50} y={91} size={40}>{base}</WarFireEffect>;
  case 3:return <ShadowParticleEffect count={38}>{base}</ShadowParticleEffect>;
  case 4:return <GoldenSparkEffect count={40}>{base}</GoldenSparkEffect>;
  case 5:return <AtmosphericFogEffect intensity={.48}>{base}</AtmosphericFogEffect>;
  default:return <ParchmentTextureEffect intensity={.65}>{base}</ParchmentTextureEffect>;
 }
};
