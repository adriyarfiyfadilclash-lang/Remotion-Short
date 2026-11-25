import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { FlatWipe, FlatCircleIris, FlatSplitReveal, FlatSlideSwap, FlatShapeReveal, FlatZoomCut } from "../src";

const Panel:React.FC<{label:string;color:string}>=({label,color})=><AbsoluteFill style={{backgroundColor:color,justifyContent:"center",alignItems:"center"}}>
 <div style={{fontFamily:"Arial",fontSize:76,fontWeight:900,color:"white"}}>{label}</div>
</AbsoluteFill>;

export const FlatTransitionShowcase:React.FC=()=> <AbsoluteFill style={{backgroundColor:"#F8FAFC"}}>
 <Sequence from={0} durationInFrames={50}><FlatWipe color="#0F172A"><Panel label="WIPE" color="#2563EB"/></FlatWipe></Sequence>
 <Sequence from={50} durationInFrames={50}><FlatCircleIris color="#0F172A"><Panel label="IRIS" color="#EA580C"/></FlatCircleIris></Sequence>
 <Sequence from={100} durationInFrames={50}><FlatSplitReveal><Panel label="SPLIT" color="#16A34A"/></FlatSplitReveal></Sequence>
 <Sequence from={150} durationInFrames={50}><FlatSlideSwap from={<Panel label="FROM" color="#7C3AED"/>} to={<Panel label="TO" color="#DB2777"/>}/></Sequence>
 <Sequence from={200} durationInFrames={50}><FlatShapeReveal><Panel label="SHAPE" color="#0891B2"/></FlatShapeReveal></Sequence>
 <Sequence from={250} durationInFrames={50}><FlatZoomCut from={<Panel label="ZOOM IN" color="#334155"/>} to={<Panel label="ZOOM OUT" color="#D97706"/>}/></Sequence>
</AbsoluteFill>;
