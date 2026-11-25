import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import {
  ExplodeOutTransition, RadialExplodeTransition, LayerPeelTransition,
  ComponentOrbitTransition, ExplodedSceneSwap,
} from "../src";

const Part: React.FC<{ color: string; shape?: "box" | "cylinder" | "torus" }> = ({ color, shape = "box" }) => (
  <mesh castShadow receiveShadow>
    {shape === "cylinder" ? <cylinderGeometry args={[0.45, 0.45, 0.28, 48]} /> :
      shape === "torus" ? <torusGeometry args={[0.38, 0.12, 20, 48]} /> :
      <boxGeometry args={[0.8, 0.25, 0.8]} />}
    <meshStandardMaterial color={color} metalness={0.72} roughness={0.24} />
  </mesh>
);

const Demo: React.FC = () => {
  const frame = useCurrentFrame();
  const phase = Math.floor(frame / 75) % 4;
  const oldScene = <group><Part color="#d4e0ea" /><Part color="#b27a38" shape="cylinder" /></group>;
  const newScene = <group position={[0, 0.7, 0]}><Part color="#6ab8d7" shape="torus" /><Part color="#e4eaf0" /></group>;
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 7, 5]} intensity={2.4} castShadow />
      <pointLight position={[-4, 2, 3]} intensity={22} color="#5fcaff" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#101b29" roughness={0.85} />
      </mesh>
      {phase === 0 ? <ExplodeOutTransition startFrame={8} duration={55} distance={1.5}><Part color="#d4e0ea" /><group position={[0, -0.55, 0]}><Part color="#b27a38" shape="cylinder" /></group></ExplodeOutTransition> :
       phase === 1 ? <RadialExplodeTransition startFrame={75} duration={55} radius={1.8} angle={frame * 0.002}><Part color="#6ab8d7" shape="torus" /></RadialExplodeTransition> :
       phase === 2 ? <LayerPeelTransition startFrame={150} duration={55} peelDistance={1.7}><Part color="#e2b35d" /></LayerPeelTransition> :
       <ExplodedSceneSwap startFrame={225} duration={55} outgoing={oldScene} incoming={newScene} />}
      {phase === 3 && <ComponentOrbitTransition startFrame={225} duration={55} radius={0.25}><group position={[1.3, 0.4, 0]}><Part color="#70c8e8" shape="torus" /></group></ComponentOrbitTransition>}
    </>
  );
};

export const ExplodedViewTransitionShowcase: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(145deg,#07111d,#1b2a3a)" }}>
    <ThreeCanvas width={1920} height={1080} camera={{ position: [4.5, 2.6, 7], fov: 43 }} shadows>
      <Demo />
    </ThreeCanvas>
    <div style={{ position: "absolute", left: 76, bottom: 54, color: "#dce7f1", fontFamily: "Arial", letterSpacing: 4, fontSize: 24, opacity: 0.8 }}>
      ADRIY PROJECT · EXPLODED VIEW TRANSITIONS
    </div>
  </AbsoluteFill>
);
