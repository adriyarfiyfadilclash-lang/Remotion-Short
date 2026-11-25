import React from "react";
import {AbsoluteFill} from "remotion";
import {PaperTextureLayer,PaperAged,PaperShadow,PaperFold,PaperRoughEdge,PaperLightLeak} from "../paper/texture-effects";

export const PaperTextureEffectsShowcase:React.FC=()=>(
 <AbsoluteFill style={{background:"#F3E7D2",fontFamily:"Georgia,serif",color:"#40382F",padding:70}}>
  <PaperTextureLayer grainOpacity={.18} fiberOpacity={.12} seed={9}/>
  <PaperAged opacity={.12} vignette={.2} warmth={.1}/>
  <div style={{fontSize:44,fontWeight:700,position:"relative"}}>Tekstur & Efek Kertas</div>
  <div style={{position:"absolute",left:110,top:190}}>
   <PaperShadow depth={8}><div style={{width:340,height:220,background:"#E7C77E",padding:24,boxSizing:"border-box",fontSize:25}}>Lapisan kertas dengan bayangan lembut</div></PaperShadow>
   <PaperFold width={340} height={220} color="#E7C77E" corner="top-right" />
  </div>
  <div style={{position:"absolute",left:570,top:230,width:420,height:220,background:"#E8D9BE",padding:25,boxSizing:"border-box",fontSize:25,boxShadow:"4px 7px 3px rgba(40,29,18,.18)"}}>Permukaan kertas tua</div>
  <div style={{position:"absolute",left:80,bottom:90}}><PaperRoughEdge width={900} height={55} color="#D7C5A7" seed={5}/></div>
  <PaperLightLeak opacity={.16} direction="left" duration={90}/>
 </AbsoluteFill>
);
