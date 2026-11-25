import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import {
  WayangStage, WayangRig, WayangWalk, WayangGesture, WayangBattlePose,
  GununganWipeTransition, OilLampFadeTransition, WayangChapterTransition,
  NusantaraTitle, AksaraReveal, ChapterHeading, DateSeal,
  GununganAsset, KeratonAsset, CandiAsset, NusantaraShipAsset,
  OilLampLighting, FlickeringFlame, KelirShadowLighting, WayangCameraRig,
  ShadowDepthLayer, WarmLightBeam, CinematicWayangFocus,
  WayangSmokeEffect, AncientDustEffect, GoldenSparkEffect, AtmosphericFogEffect,
} from "./index";

const InkText: React.FC<{children: React.ReactNode; top?: number}> = ({children, top=0}) => (
  <div style={{position:"absolute",left:0,right:0,top:`${top}%`,textAlign:"center",
    color:"#e8cf9d",fontFamily:"Georgia,serif",letterSpacing:5,textShadow:"0 2px 8px #1a1008"}}>
    {children}
  </div>
);

const PuppetSilhouette: React.FC = () => (
  <svg viewBox="0 0 360 520" width="100%" height="100%">
    <g fill="#050505" stroke="#b18a50" strokeWidth="2.2">
      <path d="M180 24 C142 58 148 91 180 116 C212 91 218 58 180 24Z"/>
      <path d="M145 112 L116 151 L130 211 L146 285 L155 410 L180 445 L205 410 L214 285 L230 211 L244 151 L215 112Z"/>
      <path d="M145 132 L79 181 L63 263 L82 270 L121 211 L160 176Z"/>
      <path d="M215 132 L281 181 L297 263 L278 270 L239 211 L200 176Z"/>
      <path d="M155 405 L126 502 L161 502 L180 445 L199 502 L234 502 L205 405Z"/>
    </g>
    <g fill="none" stroke="#e4c58d" strokeWidth="2">
      <path d="M151 139 Q180 159 209 139 M148 188 Q180 210 212 188 M153 244 Q180 264 207 244"/>
      <circle cx="180" cy="218" r="15"/>
    </g>
  </svg>
);

const Opening: React.FC = () => {
  const f = useCurrentFrame();
  const opacity = interpolate(f,[0,18,110,140],[0,1,1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  return <AbsoluteFill style={{background:"#160f09",alignItems:"center",justifyContent:"center"}}>
    <AbsoluteFill style={{background:"radial-gradient(ellipse at center,#8d6739 0%,#332216 48%,#100b07 100%)"}}/>
    <div style={{width:360,height:520,opacity,transform:`translateY(${interpolate(f,[0,140],[45,0])}px)`}}>
      <GununganAsset/>
    </div>
    <InkText top={12}><div style={{fontSize:22}}>ADRIY.PROJECT MEMPERSEMBAHKAN</div></InkText>
    <InkText top={78}><div style={{fontSize:56,fontWeight:700}}>JEJAK NUSANTARA</div><div style={{fontSize:20,marginTop:18}}>KISAH • BUDAYA • PERADABAN</div></InkText>
    <FlickeringFlame x={50} y={90} size={44}/>
    <GoldenSparkEffect count={24}><></></GoldenSparkEffect>
  </AbsoluteFill>;
};

const HistoryScene: React.FC = () => {
  const f = useCurrentFrame();
  const mode = f < 100 ? 0 : f < 200 ? 1 : f < 300 ? 2 : 3;
  return <AbsoluteFill style={{background:"linear-gradient(180deg,#24180e,#6d4c2b 55%,#1b120b)"}}>
    <AbsoluteFill style={{opacity:.28,background:"radial-gradient(ellipse,#e7c58a,transparent 65%)"}}/>
    <div style={{position:"absolute",top:70,left:0,right:0,textAlign:"center",fontFamily:"Georgia,serif",fontSize:38,color:"#f1ddb5",letterSpacing:4}}>
      {["LAHIRNYA PERADABAN","PUSAT KEKUASAAN","JALUR PERDAGANGAN","WARISAN SEJARAH"][mode]}
    </div>
    <div style={{position:"absolute",left:"8%",bottom:"13%",width:"34%",height:"60%"}}>
      {mode===0 ? <HistoricalVillagePlaceholder/> : mode===1 ? <KeratonAsset/> : mode===2 ? <NusantaraShipAsset/> : <CandiAsset/>}
    </div>
    <div style={{position:"absolute",right:"8%",bottom:"12%",width:"32%",height:"62%",display:"flex",alignItems:"center",justifyContent:"center"}}>
      {mode===0 ? <WayangRig x={0} y={0} scale={.9}/> : mode===1 ? <WayangGesture gesture="greet" x={0} y={0} scale={.9}/> : mode===2 ? <WayangWalk x={0} y={0} scale={.9}/> : <WayangBattlePose x={0} y={0} scale={.9}/>}
    </div>
    <div style={{position:"absolute",bottom:48,left:"10%",right:"10%",textAlign:"center",color:"#ead4aa",fontFamily:"Georgia,serif",fontSize:21,lineHeight:1.6}}>
      {["Dari permukiman tumbuh pusat-pusat kehidupan dan kebudayaan.","Kerajaan membangun tata kuasa, karya, dan hubungan antardaerah.","Laut menjadi penghubung manusia, gagasan, dan komoditas.","Jejak masa lalu hidup dalam peninggalan dan ingatan bersama."][mode]}
    </div>
    <AncientDustEffect count={32}/>
  </AbsoluteFill>;
};

const HistoricalVillagePlaceholder: React.FC = () => (
  <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
    <svg viewBox="0 0 400 360" width="100%" height="100%">
      <g fill="#120d08" stroke="#c49b5d" strokeWidth="4">
        <path d="M35 165 L115 80 L195 165 V315 H35Z"/><path d="M215 175 L290 95 L365 175 V315 H215Z"/>
        <path d="M20 170 L115 55 L210 170Z"/><path d="M200 180 L290 70 L380 180Z"/>
        <rect x="80" y="220" width="55" height="95" fill="#4b321b"/><rect x="265" y="220" width="48" height="95" fill="#4b321b"/>
      </g>
    </svg>
  </div>
);

const Closing: React.FC = () => (
  <AbsoluteFill style={{background:"#100b07",alignItems:"center",justifyContent:"center"}}>
    <div style={{width:300,height:380}}><GununganAsset/></div>
    <div style={{fontFamily:"Georgia,serif",fontSize:48,color:"#e6c58e",letterSpacing:6,marginTop:20}}>WARISAN NUSANTARA</div>
    <div style={{fontFamily:"Georgia,serif",fontSize:20,color:"#b89560",letterSpacing:4,marginTop:22}}>SEJARAH • BUDAYA • IDENTITAS</div>
    <div style={{position:"absolute",bottom:55,color:"#d4b47b",fontSize:17,letterSpacing:5}}>ADRIY.PROJECT</div>
  </AbsoluteFill>
);

export const WayangFinalShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < 150) return <Opening/>;
  if (frame < 570) {
    const local = frame - 150;
    return <WayangStage>
      <WayangCameraRig startZoom={1} endZoom={1.08} durationInFrames={420} panX={-8} panY={2}>
        <KelirShadowLighting intensity={.5}>
          <OilLampLighting intensity={.6} x={50} y={45} size={78}>
            <HistoryScene/>
          </OilLampLighting>
        </KelirShadowLighting>
        <WarmLightBeam x={50} y={0} size={72} intensity={.16}/>
        <CinematicWayangFocus intensity={.7} focusX={50} focusY={48} vignette={.55}/>
      </WayangCameraRig>
      {local < 140 ? <WayangSmokeEffect seed={13}><></></WayangSmokeEffect> :
       local < 280 ? <AtmosphericFogEffect intensity={.22}><></></AtmosphericFogEffect> :
       <GoldenSparkEffect count={20}><></></GoldenSparkEffect>}
    </WayangStage>;
  }
  if (frame < 690) return <GununganWipeTransition durationInFrames={120}>
    <AbsoluteFill style={{background:"#21160d",alignItems:"center",justifyContent:"center"}}>
      <NusantaraTitle text="JEJAK YANG TERTINGGAL"/>
      <div style={{position:"absolute",bottom:90,color:"#d9bd87",fontFamily:"Georgia,serif",fontSize:20}}>DARI MASA LALU UNTUK MASA DEPAN</div>
    </AbsoluteFill>
  </GununganWipeTransition>;
  if (frame < 810) return <OilLampFadeTransition durationInFrames={120}>
    <AbsoluteFill style={{background:"#1a1009",alignItems:"center",justifyContent:"center"}}>
      <AksaraReveal text="Sejarah adalah ingatan sebuah bangsa."/>
      <div style={{position:"absolute",bottom:100}}><DateSeal text="NUSANTARA"/></div>
    </AbsoluteFill>
  </OilLampFadeTransition>;
  return <Closing/>;
};
