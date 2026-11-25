import React from "react";
import {AbsoluteFill,useCurrentFrame} from "remotion";
import {Canvas} from "@react-three/fiber";
import {Environment} from "@react-three/drei";
import {StarField3D,Planet3D,OrbitPath3D} from "../index";
import {SolarSystem3D,SolarEclipse3D,LunarPhase3D,PlanetScaleComparison3D} from "../index";

const Scene:React.FC<{frame:number}> = ({frame}) => {
 const mode=Math.floor(frame/30)%4;
 return <>
  <ambientLight intensity={.28}/>
  <StarField3D count={1000} radius={30} seed={12}/>
  {mode===0 && <SolarSystem3D frame={frame}/>}
  {mode===1 && <><SolarEclipse3D frame={frame} duration={180}/><OrbitPath3D radius={1.6} color="#738ba4"/></>}
  {mode===2 && <LunarPhase3D frame={frame} cycleFrames={180} radius={.9}/>}
  {mode===3 && <><PlanetScaleComparison3D/><pointLight position={[-3,3,5]} intensity={45}/></>}
  <Environment preset="night"/>
 </>;
};
const labels=["SISTEM TATA SURYA","GERHANA MATAHARI","FASE BULAN","PERBANDINGAN UKURAN PLANET"];
export const PlanetarySystemsShowcase:React.FC=()=>{
 const frame=useCurrentFrame(),label=labels[Math.floor(frame/30)%4];
 return <AbsoluteFill style={{background:"#050b16"}}>
  <Canvas camera={{position:[0,5.8,10.5],fov:48}}><Scene frame={frame}/></Canvas>
  <div style={{position:"absolute",top:40,left:0,right:0,textAlign:"center",fontFamily:"Arial,sans-serif",color:"#f0f6ff"}}>
   <div style={{fontSize:13,letterSpacing:5,color:"#8bcdf0"}}>ADRIY.PROJECT • COSMIC MOTION</div>
   <div style={{fontSize:38,fontWeight:800,marginTop:12}}>PLANETARY SYSTEMS</div>
   <div style={{fontSize:16,marginTop:10,color:"#b5c7d9",letterSpacing:3}}>{label}</div>
  </div>
  <div style={{position:"absolute",bottom:26,left:0,right:0,textAlign:"center",fontSize:12,color:"#819bb3",letterSpacing:2}}>FRAME {frame} • 1920 × 1080 • 30 FPS</div>
 </AbsoluteFill>;
};
