import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { FlatPulse, FlatShake, FlatParallax, FlatGlow, FlatMotionTrail, FlatEffectsLayer } from "../src";

const Card:React.FC<{label:string;color:string}>=({label,color})=><div style={{width:430,height:230,backgroundColor:color,borderRadius:26,display:"grid",placeItems:"center",fontFamily:"Arial",fontSize:48,fontWeight:900,color:"white"}}>{label}</div>;
const Center:React.FC<{children:React.ReactNode}>=({children})=><AbsoluteFill style={{background:"#F8FAFC",display:"flex",alignItems:"center",justifyContent:"center"}}>{children}</AbsoluteFill>;

export const FlatEffectsMotionShowcase:React.FC=()=> <AbsoluteFill>
 <Sequence from={0} durationInFrames={60}><Center><FlatPulse><Card label="PULSE" color="#2563EB"/></FlatPulse></Center></Sequence>
 <Sequence from={60} durationInFrames={60}><Center><FlatShake><Card label="SHAKE" color="#EA580C"/></FlatShake></Center></Sequence>
 <Sequence from={120} durationInFrames={60}><Center><FlatGlow color="#A78BFA"><Card label="GLOW" color="#7C3AED"/></FlatGlow></Center></Sequence>
 <Sequence from={180} durationInFrames={60}><Center><FlatMotionTrail><Card label="TRAIL" color="#0891B2"/></FlatMotionTrail></Center></Sequence>
 <Sequence from={240} durationInFrames={60}><Center><FlatParallax layers={[
  {content:<AbsoluteFill style={{background:"#BAE6FD"}}/> ,depth:1},
  {content:<AbsoluteFill style={{justifyContent:"flex-end",alignItems:"center"}}><div style={{width:900,height:220,background:"#16A34A",borderRadius:"50% 50% 0 0"}}/></AbsoluteFill>,depth:2},
  {content:<AbsoluteFill style={{justifyContent:"center",alignItems:"center"}}><Card label="PARALLAX" color="#1D4ED8"/></AbsoluteFill>,depth:3}
 ]}/></Center></Sequence>
 <Sequence from={300} durationInFrames={60}><FlatEffectsLayer noise vignette><Center><Card label="ATMOSPHERE" color="#334155"/></Center></FlatEffectsLayer></Sequence>
</AbsoluteFill>;
