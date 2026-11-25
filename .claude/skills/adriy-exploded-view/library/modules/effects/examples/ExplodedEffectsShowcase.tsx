import React from "react";
import { AbsoluteFill } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import {
  ExplodedParticleField3D,
  ExplodedPulseRing3D,
  ComponentScanSweep3D,
  ExplodedEnergyArc3D,
  ExplodedDust3D,
} from "../src";

const Model: React.FC = () => (
  <>
    <ambientLight intensity={0.45} />
    <directionalLight position={[4, 6, 5]} intensity={2.4} />
    <pointLight position={[-3, 2, 3]} intensity={20} color="#4ecbff" />
    <mesh position={[0, 0, 0]} castShadow>
      <cylinderGeometry args={[0.72, 0.72, 0.38, 48]} />
      <meshStandardMaterial color="#667f91" metalness={0.82} roughness={0.23} />
    </mesh>
    <mesh position={[0, 1.05, 0]} castShadow>
      <torusGeometry args={[0.52, 0.11, 18, 48]} />
      <meshStandardMaterial color="#d6aa5d" metalness={0.75} roughness={0.2} />
    </mesh>
    <mesh position={[0, -0.95, 0]} castShadow>
      <cylinderGeometry args={[0.16, 0.16, 0.62, 24]} />
      <meshStandardMaterial color="#81b9d1" metalness={0.84} roughness={0.18} />
    </mesh>
    <ExplodedParticleField3D count={72} startFrame={12} duration={50} />
    <ExplodedPulseRing3D position={[0, -0.8, 0]} startFrame={22} duration={42} repeat />
    <ComponentScanSweep3D startFrame={5} duration={85} />
    <ExplodedEnergyArc3D
      points={[[1.2, -0.2, 0], [1.5, 0.3, 0.2], [1.35, 0.8, 0.1], [1.7, 1.1, 0]]}
      startFrame={18}
      duration={42}
    />
    <ExplodedDust3D count={48} />
  </>
);

export const ExplodedEffectsShowcase: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(145deg,#07111d,#1b2b3b)" }}>
    <ThreeCanvas width={1920} height={1080} camera={{ position: [4.5, 2.8, 7.5], fov: 42 }}>
      <Model />
    </ThreeCanvas>
    <div style={{ position: "absolute", left: 76, bottom: 54, color: "#dce7f1", fontFamily: "Arial", letterSpacing: 4, fontSize: 24, opacity: 0.82 }}>
      ADRIY PROJECT · EXPLODED VIEW EFFECTS
    </div>
  </AbsoluteFill>
);
