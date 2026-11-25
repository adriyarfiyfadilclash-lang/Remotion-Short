import React from "react";
import {AbsoluteFill,useCurrentFrame} from "remotion";
import {ThreeCanvas} from "@remotion/three";
import {Zoom3DTransition,Flip3DTransition,Orbit3DTransition,Portal3DTransition,DepthSlideTransition,ParticleReveal3D} from "../modules/transitions";

const DemoScene:React.FC=()=>{
 const frame=useCurrentFrame();
 const common=<mesh castShadow>
  <torusKnotGeometry args={[.8,.25,180,24]}/>
  <meshPhysicalMaterial color="#5C9CB5" metalness={.72} roughness={.2} clearcoat={1}/>
 </mesh>;
 const choice=Math.floor(frame/60)%6;
 return <>
  <ambientLight intensity={.7}/>
  <directionalLight position={[4,6,5]} intensity={2.4}/>
  <pointLight position={[-3,2,2]} intensity={22} color="#6BC6FF"/>
  <mesh rotation={[-Math.PI/2,0,0]} position={[0,-1.5,0]}><planeGeometry args={[30,30]}/><meshStandardMaterial color="#172331" roughness={.85}/></mesh>
  {choice===0?<Zoom3DTransition>{common}</Zoom3DTransition>:
   choice===1?<Flip3DTransition>{common}</Flip3DTransition>:
   choice===2?<Orbit3DTransition>{common}</Orbit3DTransition>:
   choice===3?<Portal3DTransition>{common}</Portal3DTransition>:
   choice===4?<DepthSlideTransition>{common}</DepthSlideTransition>:
   <ParticleReveal3D>{common}</ParticleReveal3D>}
 </>
};

export const Realistic3DTransitionShowcase:React.FC=()=>(
 <AbsoluteFill style={{background:"#101923"}}>
  <ThreeCanvas width={1920} height={1080} camera={{position:[0,1.2,6],fov:42}} shadows>
   <DemoScene/>
  </ThreeCanvas>
 </AbsoluteFill>
);
