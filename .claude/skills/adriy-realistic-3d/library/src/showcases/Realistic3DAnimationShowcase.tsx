import React from "react";
import {AbsoluteFill, useCurrentFrame} from "remotion";
import {ThreeCanvas} from "@remotion/three";
import {Animated3DObject,Rotate3D,Float3D,Orbit3D,Scale3D,CameraRig3D,ParticleField3D} from "../modules/animation";

const Scene:React.FC=()=>{
 const frame=useCurrentFrame();
 return <>
  <CameraRig3D position={[4,3,7]} moveTo={[3.4,2.4,6.2]} target={[0,0,0]} startFrame={0} endFrame={90}/>
  <ambientLight intensity={0.55}/>
  <directionalLight position={[4,6,5]} intensity={2.1} castShadow/>
  <pointLight position={[-4,2,-3]} intensity={35} color="#8DBBFF"/>
  <mesh rotation={[-Math.PI/2,0,0]} position={[0,-1.15,0]} receiveShadow>
   <planeGeometry args={[20,20]}/><meshStandardMaterial color="#202A36" roughness={.82}/>
  </mesh>
  <ParticleField3D count={220} spread={12} size={.018} color="#C9D9EA"/>
  <Float3D amplitude={.18} frequency={.65}>
   <Rotate3D axis="y" degreesPerSecond={28}>
    <Scale3D from={.15} to={1} startFrame={5} duration={45} overshoot={.08}>
     <mesh castShadow receiveShadow>
      <icosahedronGeometry args={[1,4]}/>
      <meshPhysicalMaterial color="#B8C8D9" metalness={.72} roughness={.22} clearcoat={1} clearcoatRoughness={.12}/>
     </mesh>
    </Scale3D>
   </Rotate3D>
  </Float3D>
  <Orbit3D radius={2.05} speed={55} startAngle={frame*0.3}>
   <mesh castShadow>
    <sphereGeometry args={[.16,32,32]}/>
    <meshStandardMaterial color="#E5A95C" metalness={.35} roughness={.28}/>
   </mesh>
  </Orbit3D>
 </>
};

export const Realistic3DAnimationShowcase:React.FC=()=>(
 <AbsoluteFill style={{background:"#111923"}}>
  <ThreeCanvas width={1920} height={1080} camera={{position:[4,3,7],fov:42}} shadows>
   <Scene/>
  </ThreeCanvas>
 </AbsoluteFill>
);
