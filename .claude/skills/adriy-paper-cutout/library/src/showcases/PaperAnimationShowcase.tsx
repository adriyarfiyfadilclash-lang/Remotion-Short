import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { PaperLayer, PaperDrop, PaperSlide, PaperFloat, PaperFlip, PaperTearReveal, PaperStack } from "../paper/animation";

const Center:React.FC<{children:React.ReactNode;bg?:string}>=({children,bg="#E9E1D2"})=>
 <AbsoluteFill style={{background:bg,justifyContent:"center",alignItems:"center"}}>{children}</AbsoluteFill>;
const Label:React.FC<{children:string;size?:number}>=({children,size=54})=>
 <div style={{fontFamily:"Georgia,serif",fontSize:size,fontWeight:800,color:"#463B2B"}}>{children}</div>;

export const PaperAnimationShowcase:React.FC=()=> <AbsoluteFill>
 <Sequence from={0} durationInFrames={60}><Center><PaperLayer texture><Label>PAPER LAYER</Label></PaperLayer></Center></Sequence>
 <Sequence from={60} durationInFrames={60}><Center><PaperDrop><PaperLayer color="#F4C7A1"><Label>PAPER DROP</Label></PaperLayer></PaperDrop></Center></Sequence>
 <Sequence from={120} durationInFrames={60}><Center><PaperSlide><PaperLayer color="#C7DCCB"><Label>PAPER SLIDE</Label></PaperLayer></PaperSlide></Center></Sequence>
 <Sequence from={180} durationInFrames={60}><Center><PaperFloat><PaperLayer color="#D8C9E8"><Label>PAPER FLOAT</Label></PaperLayer></PaperFloat></Center></Sequence>
 <Sequence from={240} durationInFrames={60}><Center><div style={{width:520,height:280}}><PaperFlip front={<PaperLayer color="#F6D77A" style={{width:520,height:280,display:"grid",placeItems:"center"}}><Label>FRONT</Label></PaperLayer>} back={<PaperLayer color="#A9C8D8" style={{width:520,height:280,display:"grid",placeItems:"center"}}><Label>BACK</Label></PaperLayer>}/></div></Center></Sequence>
 <Sequence from={300} durationInFrames={60}><Center><div style={{width:700,height:360}}><PaperTearReveal><AbsoluteFill style={{background:"#C7DCCB",justifyContent:"center",alignItems:"center"}}><Label>TEAR REVEAL</Label></AbsoluteFill></PaperTearReveal></div></Center></Sequence>
 <Sequence from={360} durationInFrames={60}><Center><PaperStack items={[
  {children:<Label size={38}>LAYER 1</Label>,color:"#F6D77A",rotation:-5},
  {children:<Label size={38}>LAYER 2</Label>,color:"#F4C7A1",rotation:3},
  {children:<Label size={38}>LAYER 3</Label>,color:"#C7DCCB",rotation:-2}
 ]}/></Center></Sequence>
</AbsoluteFill>;
