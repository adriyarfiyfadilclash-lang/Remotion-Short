import React from "react";
import {AbsoluteFill} from "remotion";
import {ThreeCanvas} from "@remotion/three";
import {
  PrimitiveObject3D,MaterialPreset3D,GlassObject3D,MetalObject3D,
  WireframeShell3D,ExtrudedShape3D,ProductPedestal3D
} from "../modules/objects-materials";

const Scene:React.FC=()=>(
 <>
  <ambientLight intensity={.65}/>
  <directionalLight position={[4,7,5]} intensity={2.4} castShadow/>
  <pointLight position={[-4,2,3]} intensity={28} color="#62BCEB"/>
  <pointLight position={[4,1,-3]} intensity={24} color="#F0A35D"/>
  <mesh rotation={[-Math.PI/2,0,0]} position={[0,-1.55,0]}>
    <planeGeometry args={[30,30]}/>
    <meshStandardMaterial color="#101A26" roughness={.85}/>
  </mesh>
  <group position={[-3.4,0,0]}>
    <PrimitiveObject3D type="sphere" size={.72} color="#C6D2DF" metalness={.82} roughness={.18}/>
    <ProductPedestal3D width={1.8} depth={1.5} height={.25} position={[0,-1.05,0]}/>
  </group>
  <group position={[-1.15,0,0]}>
    <MetalObject3D color="#D6A84F" scale={.78}/>
    <ProductPedestal3D width={1.8} depth={1.5} height={.25} position={[0,-1.05,0]} color="#253445"/>
  </group>
  <group position={[1.1,0,0]}>
    <GlassObject3D color="#8DD9ED" scale={.78}/>
    <ProductPedestal3D width={1.8} depth={1.5} height={.25} position={[0,-1.05,0]} color="#253445"/>
  </group>
  <group position={[3.35,0,0]}>
    <ExtrudedShape3D scale={.7}/>
    <WireframeShell3D scale={.78} opacity={.35}/>
    <ProductPedestal3D width={1.8} depth={1.5} height={.25} position={[0,-1.05,0]} color="#253445"/>
  </group>
 </>
);

export const Realistic3DObjectsMaterialsShowcase:React.FC=()=>(
 <AbsoluteFill style={{background:"#101923"}}>
  <ThreeCanvas width={1920} height={1080} camera={{position:[0,2.3,10],fov:42}} shadows>
    <Scene/>
  </ThreeCanvas>
 </AbsoluteFill>
);
