import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import {
  GununganWipeTransition, KelirRevealTransition, WayangShadowPassTransition,
  OilLampFadeTransition, BatikCurtainTransition, KeratonArchTransition,
  WayangChapterTransition,
} from "../src/index";

const SceneCard: React.FC<{ title:string; subtitle:string }> = ({title,subtitle}) => (
  <AbsoluteFill style={{alignItems:"center",justifyContent:"center",background:"#f3e7ce"}}>
    <div style={{fontFamily:"serif",fontSize:58,color:"#20160d",letterSpacing:5}}>{title}</div>
    <div style={{marginTop:22,fontFamily:"serif",fontSize:22,color:"#8b6336",letterSpacing:3}}>{subtitle}</div>
    <div style={{position:"absolute",bottom:70,fontSize:17,color:"#9b784e"}}>ADRIY.PROJECT • SEJARAH NUSANTARA</div>
  </AbsoluteFill>
);

const Demo: React.FC<{ kind:number }> = ({kind}) => {
  const frame=useCurrentFrame();
  const title=frame<45 ? "KERAJAAN NUSANTARA" : "JEJAK PERADABAN";
  const scene=<SceneCard title={title} subtitle="KISAH • BUDAYA • PERJALANAN WAKTU"/>;
  const props={durationInFrames:90, children:scene};
  switch(kind){
    case 0:return <GununganWipeTransition {...props}/>;
    case 1:return <KelirRevealTransition {...props}/>;
    case 2:return <WayangShadowPassTransition {...props}/>;
    case 3:return <OilLampFadeTransition {...props}/>;
    case 4:return <BatikCurtainTransition {...props}/>;
    case 5:return <KeratonArchTransition {...props}/>;
    default:return <WayangChapterTransition {...props}/>;
  }
};

export const WayangTransitionShowcase: React.FC = () => {
  const frame=useCurrentFrame();
  const index=Math.min(6,Math.floor(frame/90));
  return <AbsoluteFill><Demo key={index} kind={index}/></AbsoluteFill>;
};
