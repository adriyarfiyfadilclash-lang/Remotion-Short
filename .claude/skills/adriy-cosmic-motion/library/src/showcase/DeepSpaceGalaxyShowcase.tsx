import React from "react";
import {AbsoluteFill,useCurrentFrame} from "remotion";
import {Canvas} from "@react-three/fiber";
import {Environment} from "@react-three/drei";
import {StarField3D} from "../index";
import {Nebula3D,SpiralGalaxy3D,BlackHole3D,Supernova3D,StarCluster3D,CosmicDustField3D,GalaxyCollision3D} from "../index";

const Scene:React.FC<{frame:number}>=({frame})=>{
 const mode=Math.floor(frame/30)%7;
 return <>
  <ambientLight intensity={.18}/>
  <StarField3D count={1100} radius={34} seed={31}/>
  {mode===0&&<Nebula3D count={2300} radius={2.7} colorA="#4e65b5" colorB="#d66ba8" scale={[1.8,.8,1]}/>}
  {mode===1&&<SpiralGalaxy3D frame={frame} starCount={3400} arms={4} radius={3.2}/>}
  {mode===2&&<BlackHole3D frame={frame} radius={.72} diskRadius={1.9}/>}
  {mode===3&&<Supernova3D frame={frame} cycleFrames={210} maxRadius={3}/>}
  {mode===4&&<StarCluster3D count={2400} radius={2.5} ellipticity=.6/>}
  {mode===5&&<CosmicDustField3D count={1800} spread={9} frame={frame}/>}
  {mode===6&&<GalaxyCollision3D frame={frame} separation={4.2} approach={.006}/>}
  <Environment preset="night"/>
 </>;
};
const labels=["NEBULA","GALAKSI SPIRAL","LUBANG HITAM","SUPERNOVA","GUGUS BINTANG","DEBU KOSMIK","INTERAKSI GALAKSI"];
export const DeepSpaceGalaxyShowcase:React.FC=()=>{
 const frame=useCurrentFrame(),label=labels[Math.floor(frame/30)%7];
 return <AbsoluteFill style={{background:"#030711"}}>
  <Canvas camera={{position:[0,1.2,9.5],fov:48}}><Scene frame={frame}/></Canvas>
  <div style={{position:"absolute",top:40,left:0,right:0,textAlign:"center",fontFamily:"Arial,sans-serif",color:"#f1f5ff"}}>
   <div style={{fontSize:13,letterSpacing:5,color:"#a4c9f5"}}>ADRIY.PROJECT • COSMIC MOTION</div>
   <div style={{fontSize:38,fontWeight:800,marginTop:12}}>DEEP SPACE &amp; GALAXY</div>
   <div style={{fontSize:16,marginTop:10,color:"#c1cbe0",letterSpacing:3}}>{label}</div>
  </div>
  <div style={{position:"absolute",bottom:26,left:0,right:0,textAlign:"center",fontSize:12,color:"#8499b8",letterSpacing:2}}>FRAME {frame} • 1920 × 1080 • 30 FPS</div>
 </AbsoluteFill>;
};
