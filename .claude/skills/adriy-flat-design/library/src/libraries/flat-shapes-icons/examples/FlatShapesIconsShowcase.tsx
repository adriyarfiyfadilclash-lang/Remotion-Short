import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { FlatShape, FlatBlob, FlatArrow, FlatIconBadge, FlatDotGrid, FlatIconRow } from "../src";

const Center:React.FC<{children:React.ReactNode;bg?:string}>=({children,bg="#F8FAFC"})=>
 <AbsoluteFill style={{backgroundColor:bg,alignItems:"center",justifyContent:"center"}}>{children}</AbsoluteFill>;

export const FlatShapesIconsShowcase:React.FC=()=> <AbsoluteFill>
 <Sequence from={0} durationInFrames={55}><Center><div style={{display:"flex",gap:34,alignItems:"center"}}><FlatShape shape="circle"/><FlatShape shape="square" color="#F97316"/><FlatShape shape="triangle" color="#16A34A"/><FlatShape shape="diamond" color="#7C3AED"/></div></Center></Sequence>
 <Sequence from={55} durationInFrames={55}><Center><FlatBlob size={320}/></Center></Sequence>
 <Sequence from={110} durationInFrames={55}><Center><FlatArrow direction="right" width={300} thickness={18}/></Center></Sequence>
 <Sequence from={165} durationInFrames={55}><Center><FlatIconRow items={[{name:"check",label:"Selesai"},{name:"star",label:"Favorit",background:"#F59E0B"},{name:"info",label:"Info",background:"#0F766E"}]}/></Center></Sequence>
 <Sequence from={220} durationInFrames={55}><Center><FlatDotGrid rows={6} columns={9} dotSize={18} gap={20} color="#2563EB"/></Center></Sequence>
 <Sequence from={275} durationInFrames={55}><Center><FlatIconBadge name="play" label="Mulai" size={140} background="#DB2777"/></Center></Sequence>
</AbsoluteFill>;
