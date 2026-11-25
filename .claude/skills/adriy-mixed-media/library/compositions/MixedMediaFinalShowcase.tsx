import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import {
 MixedMediaScene, PaperLayer, CollageCard, DepthStack, MixedMediaFrame,
 PaperRevealTransition, EditorialTitle, TypewriterCaption, ArchiveLabel,
 TornPaperAsset, MaskingTape, PolaroidFrame, CollagePin,
 MixedMediaCameraRig, ParallaxLayer, SpotlightFocus, SoftboxLight, RimLightEdge,
 FilmGrainOverlay, DustParticleField, LightLeakOverlay, SoftVignette
} from "../src";

const Board:React.FC=()=>(
 <AbsoluteFill style={{background:"#17191f",overflow:"hidden"}}>
  <MixedMediaCameraRig zoomFrom={1.01} zoomTo={1.055} panX={-12} panY={4} duration={450}>
   <MixedMediaScene background="#20262c" accent="#ef6b4a" enter={false} grainOpacity={0}>
    <ParallaxLayer x={0} y={0} width={1920} height={1080} depth={.2} moveX={14} moveY={4}>
     <AbsoluteFill style={{background:"radial-gradient(circle at 75% 18%,#ef6b4a28,transparent 35%),linear-gradient(135deg,#334955,#17191f 70%)"}}/>
    </ParallaxLayer>
    <ParallaxLayer x={100} y={90} width={900} height={600} depth={.8} moveX={22} moveY={8}>
     <ArchiveLabel x={0} y={0} text="ADRIY.PROJECT" subtext="MIXED MEDIA / VOL. 08" />
     <EditorialTitle x={0} y={95} width={920} text="CERITA DALAM LAPISAN" fontSize={88} accent="#ef6b4a"/>
     <TypewriterCaption x={6} y={310} width={720} text="Menggabungkan arsip, ilustrasi, kertas, dan gerak menjadi satu cerita visual." delay={20} charsPerFrame={1.1}/>
    </ParallaxLayer>
    <ParallaxLayer x={1060} y={170} width={650} height={650} depth={1.5} moveX={32} moveY={14}>
     <TornPaperAsset x={0} y={0} width={520} height={590} color="#e9e1d2" rotate={3}>
      <div style={{fontFamily:"Arial,sans-serif",fontSize:30,fontWeight:900,color:"#25231f"}}>CATATAN<br/>ARSIP VISUAL</div>
      <div style={{marginTop:22,width:"100%",height:330,background:"linear-gradient(135deg,#b36e4f,#344e5b 65%,#20262c)"}}/>
      <div style={{marginTop:16,fontSize:17,color:"#38352f"}}>Foto, tekstur, dan potongan ide.</div>
     </TornPaperAsset>
     <MaskingTape x={100} y={-12} width={150} rotate={-9}/>
     <CollagePin x={80} y={-18} size={25}/>
    </ParallaxLayer>
    <CollageCard x={170} y={600} width={310} height={250} index="01" title="ARSIP" subtitle="Potongan masa lalu" rotate={-4}/>
    <DepthStack x={560} y={640} width={340} height={150} layers={[{color:"#ef6b4a",label:"FOTO"},{color:"#e9e1d2",label:"KERTAS",offsetX:10,offsetY:10},{color:"#4d6875",label:"CERITA",offsetX:20,offsetY:20}]}/>
    <MixedMediaFrame x={1040} y={770} width={560} height={180} label="VISUAL STUDY" borderColor="#ef6b4a">
     <AbsoluteFill style={{background:"linear-gradient(120deg,#3c5965,#17191f)",justifyContent:"center",alignItems:"center",color:"#f4f0e8",fontSize:30,fontWeight:900}}>2D • FOTO • KOLASE</AbsoluteFill>
    </MixedMediaFrame>
   </MixedMediaScene>
  </MixedMediaCameraRig>
  <SoftboxLight x={8} y={5} width={78} height={60} intensity={.2}/>
  <SpotlightFocus x={73} y={42} size={510} opacity={.26}/>
  <RimLightEdge side="right" color="#ef8c65" intensity={.22}/>
  <DustParticleField count={24} opacity={.2} size={2}/>
  <LightLeakOverlay side="left" intensity={.14}/>
  <SoftVignette strength={.28}/>
  <FilmGrainOverlay opacity={.07}/>
 </AbsoluteFill>
);

export const MixedMediaFinalShowcase:React.FC=()=>(
 <PaperRevealTransition duration={30} direction="right" color="#e9e1d2">
  <Board/>
 </PaperRevealTransition>
);
