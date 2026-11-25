import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Canvas } from "@react-three/fiber";
import { Environment, Sphere, MeshStandardMaterial } from "@react-three/drei";
import {
  MedicalCalloutLabel, AnatomyLeaderLine, OrganHighlightEffect,
  XRayGlowEffect, ScanSweepEffect, MeasurementOverlay3D,
  MedicalAnnotationPanel
} from "../index";

const Scene: React.FC<{frame:number}> = ({frame}) => {
  const mode=Math.floor(frame/22)%7;
  return <>
    <ambientLight intensity={0.55}/>
    <directionalLight position={[4,5,5]} intensity={1.6}/>
    <Environment preset="studio"/>
    <mesh>
      <Sphere args={[0.9,48,36]}>
        <MeshStandardMaterial color={mode===2 ? "#8fd8ec" : "#b96d78"} roughness={0.38} metalness={0.04}/>
      </Sphere>
    </mesh>
    {mode===0 && <>
      <AnatomyLeaderLine points={[[0.55,0.35,0],[1.35,0.85,0],[1.9,0.85,0]]}/>
      <MedicalCalloutLabel title="JANTUNG" detail="Organ pemompa darah" position={[2,0.9,0]}/>
    </>}
    {mode===1 && <OrganHighlightEffect frame={frame} position={[0,0,0]} radius={1.05}/>}
    {mode===2 && <XRayGlowEffect position={[0,0,0]} radius={1.12}/>}
    {mode===3 && <ScanSweepEffect frame={frame} position={[0,0,0.7]} width={3.2} height={2.4}/>}
    {mode===4 && <MeasurementOverlay3D start={[-1.1,-0.2,0.2]} end={[1.1,-0.2,0.2]} label="2.2" unit="cm"/>}
    {mode===5 && <>
      <AnatomyLeaderLine points={[[0.45,0.25,0],[1.2,0.55,0],[1.7,0.55,0]]} color="#f2cb72"/>
      <MedicalCalloutLabel title="AREA ANATOMI" detail="Contoh label struktur" position={[1.8,0.65,0]} color="#f2cb72"/>
    </>}
    {mode===6 && <MedicalAnnotationPanel heading="KETERANGAN MEDIS" body="Visualisasi edukasi untuk menjelaskan struktur dan fungsi organ." position={[1.2,0.5,0]}/>}
  </>;
};

const titles=["GARIS PENUNJUK ANATOMI","SOROTAN ORGAN","EFEK RONTGEN","PEMINDAIAN STRUKTUR","PENGUKURAN ANATOMI","LABEL STRUKTUR","PANEL KETERANGAN"];
export const MedicalEffectsLabelsShowcase: React.FC=()=>{
  const frame=useCurrentFrame();
  const title=titles[Math.floor(frame/22)%7];
  return <AbsoluteFill style={{background:"#0c1822"}}>
    <Canvas camera={{position:[0,0,5.4],fov:42}}>
      <Scene frame={frame}/>
    </Canvas>
    <div style={{position:"absolute",top:42,left:0,right:0,textAlign:"center",fontFamily:"Arial,sans-serif",color:"#eef7fb"}}>
      <div style={{fontSize:14,letterSpacing:6,color:"#79cde5"}}>ADRIY.PROJECT • MEDICAL VISUALIZATION</div>
      <div style={{fontSize:38,fontWeight:700,marginTop:12}}>MEDICAL EFFECTS &amp; LABELS</div>
      <div style={{fontSize:18,marginTop:12,color:"#b8cbd7",letterSpacing:3}}>{title}</div>
    </div>
    <div style={{position:"absolute",bottom:30,left:0,right:0,textAlign:"center",fontSize:13,color:"#91a7b8",letterSpacing:2}}>FRAME {frame} • 1920 × 1080 • 30 FPS</div>
  </AbsoluteFill>;
};
