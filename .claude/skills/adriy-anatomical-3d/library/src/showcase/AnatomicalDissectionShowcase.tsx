import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import {
  ExplodedAnatomy3D, CrossSection3D, OrganIsolation3D,
  TissueSeparation3D, AnatomicalCutaway3D, DissectionSequence3D
} from "../index";

const Scene: React.FC<{frame:number}> = ({frame}) => {
  const mode = Math.floor(frame/25)%6;
  return <>
    <ambientLight intensity={0.85}/>
    <directionalLight position={[4,6,5]} intensity={2}/>
    <pointLight position={[-3,2,3]} intensity={18} color="#6bc9ed"/>
    {mode===0 && <ExplodedAnatomy3D progress={(frame%25)/24} position={[0,0,0]}/>}
    {mode===1 && <CrossSection3D position={[0,0,0]}/>}
    {mode===2 && <OrganIsolation3D organ="heart" scale={1.7}/>}
    {mode===3 && <TissueSeparation3D position={[0,0,0]}/>}
    {mode===4 && <AnatomicalCutaway3D position={[0,0,0]}/>}
    {mode===5 && <DissectionSequence3D mode="layers" stageDuration={25}/>}
    <ContactShadows position={[0,-1.5,0]} opacity={0.3} scale={7} blur={2}/>
    <Environment preset="studio"/>
    <OrbitControls enablePan={false} minDistance={4} maxDistance={10}/>
  </>;
};

const titles = ["PEMISAHAN LAPISAN","PENAMPANG JARINGAN","ISOLASI ORGAN","LAPISAN JARINGAN","POTONGAN ANATOMI","URUTAN PEMBEDAHAN"];
export const AnatomicalDissectionShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const title = titles[Math.floor(frame/25)%titles.length];
  return <AbsoluteFill style={{background:"#101923"}}>
    <Canvas camera={{position:[0,0.8,6],fov:42}}>
      <Scene frame={frame}/>
    </Canvas>
    <div style={{position:"absolute",top:42,left:0,right:0,textAlign:"center",fontFamily:"Arial,sans-serif",color:"#eef5fa"}}>
      <div style={{fontSize:14,letterSpacing:6,color:"#75c8df"}}>ADRIY.PROJECT • MEDICAL VISUALIZATION</div>
      <div style={{fontSize:38,fontWeight:700,marginTop:12}}>ANATOMICAL DISSECTION</div>
      <div style={{fontSize:18,marginTop:12,color:"#b8c8d4",letterSpacing:3}}>{title}</div>
    </div>
    <div style={{position:"absolute",bottom:30,left:0,right:0,textAlign:"center",fontSize:13,color:"#91a7b8",letterSpacing:2}}>
      FRAME {frame} • 1920 × 1080 • 30 FPS
    </div>
  </AbsoluteFill>;
};
