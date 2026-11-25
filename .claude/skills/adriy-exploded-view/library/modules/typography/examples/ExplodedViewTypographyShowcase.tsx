import React from "react";
import { AbsoluteFill } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import {
  ExplodedLabel3D, ComponentNumber3D, LeaderLine3D, DimensionLine3D,
  TechnicalCallout3D, PartNameTag3D, AnnotationGroup3D,
} from "../src";

const Scene: React.FC = () => (
  <>
    <ambientLight intensity={0.55} />
    <directionalLight position={[4, 6, 5]} intensity={2.2} />
    <pointLight position={[-4, 2, 3]} intensity={20} color="#54c6f4" />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
      <planeGeometry args={[24, 24]} />
      <meshStandardMaterial color="#101b29" roughness={0.85} />
    </mesh>
    <group position={[-0.8, 0, 0]}>
      <mesh castShadow><cylinderGeometry args={[0.62, 0.62, 0.22, 64]} /><meshStandardMaterial color="#c6d4e1" metalness={0.8} roughness={0.2} /></mesh>
      <mesh position={[0, 0.72, 0]} castShadow><torusGeometry args={[0.42, 0.09, 24, 64]} /><meshStandardMaterial color="#d8a24e" metalness={0.7} roughness={0.22} /></mesh>
      <mesh position={[0, -0.62, 0]} castShadow><cylinderGeometry args={[0.22, 0.22, 0.7, 32]} /><meshStandardMaterial color="#75b9d5" metalness={0.75} roughness={0.2} /></mesh>
    </group>
    <AnnotationGroup3D position={[0.9, 0.9, 0.2]} startFrame={8}>
      <ComponentNumber3D number="01" position={[0, 0.35, 0]} />
      <ExplodedLabel3D text="OUTER HOUSING" position={[0.28, 0.35, 0]} fontSize={0.16} />
      <LeaderLine3D points={[[-0.9, 0.1, 0], [-0.25, 0.1, 0], [0.02, 0.35, 0]]} />
      <PartNameTag3D name="Bearing ring" code="BR-024" position={[0.2, -0.3, 0]} width={1.35} />
    </AnnotationGroup3D>
    <TechnicalCallout3D title="INNER SHAFT" detail="Hardened alloy steel" points={[[-0.3, -0.62, 0], [-1.4, -0.9, 0], [-2.5, -0.9, 0]]} />
    <DimensionLine3D start={[-1.2, -1.18, 0]} end={[0.1, -1.18, 0]} label="Ø 42 mm" />
    <ExplodedLabel3D text="ASSEMBLY BREAKDOWN" position={[-3.6, 2.2, 0]} fontSize={0.22} color="#e9bd70" />
  </>
);

export const ExplodedViewTypographyShowcase: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(145deg,#07111d,#1b2a3a)" }}>
    <ThreeCanvas width={1920} height={1080} camera={{ position: [4.5, 2.7, 8], fov: 43 }}>
      <Scene />
    </ThreeCanvas>
    <div style={{ position: "absolute", left: 76, bottom: 54, color: "#dce7f1", fontFamily: "Arial", letterSpacing: 4, fontSize: 24, opacity: 0.8 }}>
      ADRIY PROJECT · EXPLODED VIEW TYPOGRAPHY
    </div>
  </AbsoluteFill>
);
