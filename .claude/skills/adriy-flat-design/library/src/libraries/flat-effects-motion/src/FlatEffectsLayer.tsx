import React from "react";
import { AbsoluteFill } from "remotion";
import { FlatNoiseOverlay } from "./FlatNoiseOverlay";

type Props={children:React.ReactNode;vignette?:boolean;noise?:boolean;vignetteOpacity?:number;noiseOpacity?:number};
export const FlatEffectsLayer:React.FC<Props>=({children,vignette=true,noise=false,vignetteOpacity=.22,noiseOpacity=.05})=>
 <AbsoluteFill>
  {children}
  {vignette&&<AbsoluteFill style={{pointerEvents:"none",background:"radial-gradient(ellipse at center, transparent 55%, rgba(15,23,42,.55) 100%)",opacity:vignetteOpacity}}/>}
  {noise&&<FlatNoiseOverlay opacity={noiseOpacity}/>}
 </AbsoluteFill>;
