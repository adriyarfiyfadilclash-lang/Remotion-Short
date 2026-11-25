import React from "react";
import {AbsoluteFill,useCurrentFrame} from "remotion";
import {Canvas} from "@react-three/fiber";
import {Environment,Stars} from "@react-three/drei";
import {StarField3D,Planet3D,Moon3D,AsteroidBelt3D,Comet3D,Satellite3D,OrbitPath3D} from "../index";

const Scene:React.FC<{frame:number}>=({frame})=><>
 <ambientLight intensity={.22}/>
 <pointLight position={[0,0,0]} intensity={90} distance={24} color="#fff0d1"/>
 <StarField3D count={1200} radius={35} seed={22}/>
 <OrbitPath3D radius={2.15} color="#6f879a"/>
 <OrbitPath3D radius={3.1} color="#526c80" opacity={.35}/>
 <Planet3D radius={.95} color="#d18b50" frame={frame} rotationSpeed={.008} roughness={.78}/>
 <Moon3D frame={frame} orbitRadius={2.15} orbitSpeed={.018}/>
 <AsteroidBelt3D frame={frame} count={100} innerRadius={2.7} outerRadius={3.35}/>
 <Satellite3D frame={frame} position={[0,0,3.1]} scale={.55}/>
 <Comet3D frame={frame} start={[-5,2,-1]} end={[5,-2,-1]} duration={210}/>
 <Environment preset="night"/>
</>;

export const CosmicCoreShowcase:React.FC=()=>{
 const frame=useCurrentFrame();
 return <AbsoluteFill style={{background:"#050b16"}}>
  <Canvas camera={{position:[0,2.5,9],fov:48}}><Scene frame={frame}/></Canvas>
  <div style={{position:"absolute",top:42,left:0,right:0,textAlign:"center",fontFamily:"Arial,sans-serif",color:"#f0f6ff"}}>
   <div style={{fontSize:14,letterSpacing:6,color:"#8bcdf0"}}>ADRIY.PROJECT • COSMIC MOTION</div>
   <div style={{fontSize:42,fontWeight:800,marginTop:12}}>COSMIC CORE</div>
   <div style={{fontSize:17,marginTop:12,color:"#b5c7d9",letterSpacing:3}}>PLANET • MOON • ASTEROID • COMET • SATELLITE</div>
  </div>
  <div style={{position:"absolute",bottom:28,left:0,right:0,textAlign:"center",fontSize:12,color:"#819bb3",letterSpacing:2}}>FRAME {frame} • 1920 × 1080 • 30 FPS</div>
 </AbsoluteFill>;
};
