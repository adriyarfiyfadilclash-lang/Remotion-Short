import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import {
  AnatomyCameraRig, OrganFocusCamera, MedicalStudioLighting,
  TransparentBodyLighting, AnatomicalDepthLayer, MacroMedicalCamera,
  CinematicAnatomyFocus
} from "../index";

const Scene: React.FC<{frame:number}> = ({frame}) => {
  const mode = Math.floor(frame / 22) % 7;
  return <>
    {mode === 0 && <><AnatomyCameraRig frame={frame} orbitRadius={0.45}/><MedicalStudioLighting/></>}
    {mode === 1 && <><OrganFocusCamera frame={frame}/><MedicalStudioLighting intensity={1.8}/></>}
    {mode === 2 && <><AnatomyCameraRig position={[0,0.2,5.5]}/><TransparentBodyLighting/></>}
    {mode === 3 && <><AnatomyCameraRig position={[0,0,5]}/><MedicalStudioLighting intensity={1.3}/></>}
    {mode === 4 && <><AnatomyCameraRig position={[0,0,5]}/><MedicalStudioLighting/></>}
    {mode === 5 && <><MacroMedicalCamera frame={frame} position={[0,0,2.5]} magnification={1.15}/><TransparentBodyLighting intensity={1.5}/></>}
    {mode === 6 && <><AnatomyCameraRig frame={frame} orbitRadius={0.25}/><CinematicAnatomyFocus frame={frame}/></>}
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.18}>
      <AnatomicalDepthLayer depth={0} opacity={0.96}>
        <Sphere args={[1,48,48]}>
          <MeshDistortMaterial color={mode===2 ? "#8edcf2" : "#c86d76"} roughness={0.35} metalness={0.05} distort={0.22} speed={1.4} transparent opacity={mode===2 ? 0.48 : 1}/>
        </Sphere>
      </AnatomicalDepthLayer>
    </Float>
    <ContactShadows position={[0,-1.35,0]} opacity={0.28} scale={6} blur={2}/>
    <Environment preset="studio"/>
  </>;
};

const titles = ["KAMERA ANATOMI","FOKUS ORGAN","PENCAHAYAAN TRANSPARAN","KEDALAMAN LAPISAN","PENCAHAYAAN MEDIS","KAMERA MAKRO","FOKUS SINEMATIK"];
export const MedicalCameraLightingShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const title = titles[Math.floor(frame/22)%7];
  return <AbsoluteFill style={{background:"#0d1822"}}>
    <Canvas camera={{position:[0,0,6],fov:42}}>
      <Scene frame={frame}/>
    </Canvas>
    <div style={{position:"absolute",top:42,left:0,right:0,textAlign:"center",fontFamily:"Arial,sans-serif",color:"#eef7fb"}}>
      <div style={{fontSize:14,letterSpacing:6,color:"#79cde5"}}>ADRIY.PROJECT • MEDICAL VISUALIZATION</div>
      <div style={{fontSize:38,fontWeight:700,marginTop:12}}>MEDICAL CAMERA &amp; LIGHTING</div>
      <div style={{fontSize:18,marginTop:12,color:"#b8cbd7",letterSpacing:3}}>{title}</div>
    </div>
    <div style={{position:"absolute",bottom:30,left:0,right:0,textAlign:"center",fontSize:13,color:"#91a7b8",letterSpacing:2}}>
      FRAME {frame} • 1920 × 1080 • 30 FPS
    </div>
  </AbsoluteFill>;
};
