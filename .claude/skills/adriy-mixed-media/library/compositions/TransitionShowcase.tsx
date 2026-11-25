import React from "react";
import { AbsoluteFill } from "remotion";
import { CollageScatterTransition, PhotoSlideTransition, TapePeelTransition, HalftoneWipeTransition, SplitPanelTransition, MixedMediaGlitchTransition } from "../src";
const Scene:React.FC<{title:string;color:string}>=({title,color})=><AbsoluteFill style={{background:color,justifyContent:"center",alignItems:"center",color:"#fff",fontFamily:"Arial,sans-serif",fontSize:72,fontWeight:900}}>{title}</AbsoluteFill>;
export const MixedMediaTransitionShowcase:React.FC=()=> <CollageScatterTransition duration={30}><Scene title="TRANSISI KOLASE" color="#334955"/></CollageScatterTransition>;
export const MixedMediaTransitionVariants:React.FC=()=> <PhotoSlideTransition duration={24}><Scene title="PHOTO SLIDE" color="#5b3b35"/></PhotoSlideTransition>;
