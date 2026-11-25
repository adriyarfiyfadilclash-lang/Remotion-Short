import React from "react";
import {AbsoluteFill} from "remotion";
import {ThreeCanvas} from "@remotion/three";
import {Metallic3DText,Kinetic3DText,Floating3DLabel,Neon3DText,Text3DPlate,Typewriter3D} from "../modules/typography";

const Scene:React.FC=()=>(
 <>
  <ambientLight intensity={.65}/>
  <directionalLight position={[4,6,5]} intensity={2.2}/>
  <pointLight position={[-4,2,3]} intensity={28} color="#36BCEB"/>
  <pointLight position={[4,-1,-2]} intensity={20} color="#F29A58"/>
  <mesh rotation={[-Math.PI/2,0,0]} position={[0,-2,0]}>
   <planeGeometry args={[30,30]}/>
   <meshStandardMaterial color="#111B28" roughness={.8}/>
  </mesh>
  <Metallic3DText text="ADRIY PROJECT" fontSize={.78} color="#D5E0EB" position={[0,1.15,0]} letterSpacing={.06}/>
  <Kinetic3DText text="REALISTIC 3D" fontSize={.58} position={[0,.05,.1]} color="#E9B86C" startFrame={8}/>
  <Floating3DLabel text="DIMENSI • MATERIAL • CAHAYA" fontSize={.22} color="#A9C5D8" position={[0,-.75,.1]}/>
  <Neon3DText text="MOTION" fontSize={.42} color="#43D8F2" glowIntensity={1.5} position={[0,-1.35,.2]}/>
  <Text3DPlate title="VISUAL STORYTELLING" subtitle="Animasi tiga dimensi" position={[0,-2.8,0]}/>
  <Typewriter3D text="Membangun visual yang terasa nyata." fontSize={.22} color="#E6EDF4" position={[-2.4,-3.8,.1]}/>
 </>
);

export const Realistic3DTypographyShowcase:React.FC=()=>(
 <AbsoluteFill style={{background:"#101923"}}>
  <ThreeCanvas width={1920} height={1080} camera={{position:[0,0,10],fov:42}}>
   <Scene/>
  </ThreeCanvas>
 </AbsoluteFill>
);
