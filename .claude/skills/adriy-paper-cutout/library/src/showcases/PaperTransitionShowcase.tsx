import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { PaperWipe, PaperPageTurn, PaperFoldTransition, PaperPeelReveal, PaperShutter, PaperCollageSwap } from "../paper/transition";

const Scene:React.FC<{label:string;color:string}>=({label,color})=><AbsoluteFill style={{background:color,justifyContent:"center",alignItems:"center"}}>
 <div style={{fontFamily:"Georgia,serif",fontSize:76,fontWeight:900,color:"#463B2B"}}>{label}</div>
</AbsoluteFill>;
const Center:React.FC<{children:React.ReactNode}>=({children})=><AbsoluteFill style={{background:"#E9E1D2",justifyContent:"center",alignItems:"center"}}>{children}</AbsoluteFill>;

export const PaperTransitionShowcase:React.FC=()=> <AbsoluteFill>
 <Sequence from={0} durationInFrames={55}><Center><div style={{width:900,height:500}}><PaperWipe><Scene label="PAPER WIPE" color="#D9C6A5"/></PaperWipe></div></Center></Sequence>
 <Sequence from={55} durationInFrames={55}><Center><div style={{width:900,height:500}}><PaperPageTurn front={<Scene label="HALAMAN DEPAN" color="#F2D7A0"/>} back={<Scene label="HALAMAN BELAKANG" color="#C7DCCB"/>}/></div></Center></Sequence>
 <Sequence from={110} durationInFrames={55}><Center><div style={{width:900,height:500}}><PaperFoldTransition><Scene label="PAPER FOLD" color="#D8C9E8"/></PaperFoldTransition></div></Center></Sequence>
 <Sequence from={165} durationInFrames={55}><Center><div style={{width:900,height:500}}><PaperPeelReveal><Scene label="PEEL REVEAL" color="#B9D7E5"/></PaperPeelReveal></div></Center></Sequence>
 <Sequence from={220} durationInFrames={55}><Center><div style={{width:900,height:500}}><PaperShutter><Scene label="PAPER SHUTTER" color="#F4C7A1"/></PaperShutter></div></Center></Sequence>
 <Sequence from={275} durationInFrames={55}><Center><div style={{width:900,height:500}}><PaperCollageSwap from={<Scene label="ADEGAN A" color="#C7DCCB"/>} to={<Scene label="ADEGAN B" color="#F2D7A0"/>}/></div></Center></Sequence>
</AbsoluteFill>;
