import React from "react";
import { AbsoluteFill } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import {
  ExplodedAssembly, ExplodedPart, ExplodedPartFloat, ExplodedPartReveal,
} from "../src";

const Metal: React.FC<{ color: string }> = ({ color }) => (
  <mesh castShadow receiveShadow>
    <cylinderGeometry args={[0.58, 0.58, 0.18, 64]} />
    <meshStandardMaterial color={color} metalness={0.78} roughness={0.24} />
  </mesh>
);

const Scene: React.FC = () => (
  <>
    <ambientLight intensity={0.5} />
    <directionalLight position={[4, 7, 5]} intensity={2.5} castShadow />
    <pointLight position={[-4, 2, 3]} intensity={24} color="#64c8ff" />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]} receiveShadow>
      <planeGeometry args={[24, 24]} />
      <meshStandardMaterial color="#111d2b" roughness={0.86} />
    </mesh>
    <ExplodedAssembly startFrame={12} duration={90}>
      <ExplodedPart assembledPosition={[0, 0, 0]} explodedOffset={[0, 1.15, 0]}>
        <ExplodedPartFloat amplitude={0.025} phase={0}>
          <ExplodedPartReveal delay={0.02}><Metal color="#d9e2ec" /></ExplodedPartReveal>
        </ExplodedPartFloat>
      </ExplodedPart>
      <ExplodedPart assembledPosition={[0, -0.18, 0]} explodedOffset={[0, -0.9, 0]} explodedRotation={[0.25, 0, 0]}>
        <ExplodedPartReveal delay={0.12}><Metal color="#c18b43" /></ExplodedPartReveal>
      </ExplodedPart>
      <ExplodedPart assembledPosition={[0, 0.18, 0]} explodedOffset={[1.25, 0.1, 0]} explodedRotation={[0, 0.35, 0]}>
        <ExplodedPartReveal delay={0.22}><mesh castShadow><torusGeometry args={[0.48, 0.09, 20, 64]} /><meshStandardMaterial color="#7ca9c9" metalness={0.7} roughness={0.2} /></mesh></ExplodedPartReveal>
      </ExplodedPart>
      <ExplodedPart assembledPosition={[0, 0, 0]} explodedOffset={[-1.25, 0.1, 0]} explodedRotation={[0.2, 0, 0.4]}>
        <ExplodedPartReveal delay={0.3}><mesh castShadow><cylinderGeometry args={[0.12, 0.12, 0.95, 32]} /><meshStandardMaterial color="#e4eaf0" metalness={0.85} roughness={0.18} /></mesh></ExplodedPartReveal>
      </ExplodedPart>
    </ExplodedAssembly>
  </>
);

export const ExplodedViewAnimationShowcase: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(145deg,#07111d,#1b2a3a)" }}>
    <ThreeCanvas width={1920} height={1080} camera={{ position: [5, 3.2, 8], fov: 42 }} shadows>
      <Scene />
    </ThreeCanvas>
    <div style={{ position: "absolute", left: 76, bottom: 54, color: "#dce7f1", fontFamily: "Arial", letterSpacing: 4, fontSize: 24, opacity: 0.8 }}>
      ADRIY PROJECT · EXPLODED VIEW ANIMATION
    </div>
  </AbsoluteFill>
);
