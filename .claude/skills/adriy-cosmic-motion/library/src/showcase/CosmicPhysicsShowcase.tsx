import React from "react";
import {AbsoluteFill,useCurrentFrame} from "remotion";
import {Canvas} from "@react-three/fiber";
import {Environment} from "@react-three/drei";
import {StarField3D,Planet3D} from "../index";
import {GravityWell3D,GravityField3D,MagneticField3D,GravitationalWave3D,RelativityLens3D,OrbitalMechanics3D,CosmicTrajectory3D} from "../index";

const Scene:React.FC<{frame:number}>=({frame})=>{
 const mode=Math.floor(frame/30)%7;
 return <>
  <ambientLight intensity={.22}/>
  <StarField3D count={900} radius={32} seed={51}/>
  {mode===0&&<><GravityWell3D frame={frame}/><Planet3D radius={.3} color="#e8b66d" position={[0,-.4,0]}/></>}
  {mode===1&&<><GravityField3D fieldRadius={2.6}/><Planet3D radius={.42} color="#d9b27a"/></>}
  {mode===2&&<><MagneticField3D frame={frame}/><Planet3D radius={.55} color="#4e91c4"/></>}
  {mode===3&&<GravitationalWave3D frame={frame} waveCount={6}/>}
  {mode===4&&<RelativityLens3D frame={frame} radius={1.25}/>}
  {mode===5&&<><OrbitalMechanics3D frame={frame} semiMajorAxis={2.1} eccentricity={.35} periodFrames={180}><Planet3D radius={.22} color="#e6a86b"/></OrbitalMechanics3D><Planet3D radius={.35} color="#fff0bc"/></>}
  {mode===6&&<CosmicTrajectory3D frame={frame} start={[-3,-1,0]} control={[0,2,0]} end={[3,-1,0]}/>}
  <Environment preset="night"/>
 </>;
};
const labels=["SUMUR GRAVITASI","MEDAN GRAVITASI","MEDAN MAGNET","GELOMBANG GRAVITASI","LENSA GRAVITASI","MEKANIKA ORBIT","LINTASAN KOSMIK"];
export const CosmicPhysicsShowcase:React.FC=()=>{
 const frame=useCurrentFrame(),label=labels[Math.floor(frame/30)%7];
 return <AbsoluteFill style={{background:"#030812"}}>
  <Canvas camera={{position:[0,1.1,8.5],fov:48}}><Scene frame={frame}/></Canvas>
  <div style={{position:"absolute",top:40,left:0,right:0,textAlign:"center",fontFamily:"Arial,sans-serif",color:"#f1f6ff"}}>
   <div style={{fontSize:13,letterSpacing:5,color:"#9bcdf0"}}>ADRIY.PROJECT • COSMIC MOTION</div>
   <div style={{fontSize:38,fontWeight:800,marginTop:12}}>COSMIC PHYSICS</div>
   <div style={{fontSize:16,marginTop:10,color:"#c1cde0",letterSpacing:3}}>{label}</div>
  </div>
  <div style={{position:"absolute",bottom:26,left:0,right:0,textAlign:"center",fontSize:12,color:"#849ab6",letterSpacing:2}}>FRAME {frame} • 1920 × 1080 • 30 FPS</div>
 </AbsoluteFill>;
};
