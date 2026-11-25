import React from "react";
import { AbsoluteFill } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import {
  CameraOrbitMove3D,
  ExplodedLightingRig3D,
  TechnicalSpotlight3D,
  ShadowStage3D,
} from "../src";

const Model: React.FC = () => (
  <>
    <mesh castShadow position={[0, 0, 0]}>
      <cylinderGeometry args={[0.85, 0.85, 0.5, 64]} />
      <meshStandardMaterial color="#667e91" metalness={0.82} roughness={0.24} />
    </mesh>
    <mesh castShadow position={[0, 1.05, 0]}>
      <torusGeometry args={[0.62, 0.12, 24, 64]} />
      <meshStandardMaterial color="#d4a64d" metalness={0.78} roughness={0.2} />
    </mesh>
    <mesh castShadow position={[0, -0.95, 0]}>
      <cylinderGeometry args={[0.19, 0.19, 0.7, 32]} />
      <meshStandardMaterial color="#80b7cf" metalness={0.85} roughness={0.18} />
    </mesh>
    <mesh castShadow position={[1.15, 0.48, 0.15]}>
      <boxGeometry args={[0.22, 0.7, 0.22]} />
      <meshStandardMaterial color="#aab9c5" metalness={0.82} roughness={0.23} />
    </mesh>
  </>
);

const Scene: React.FC = () => (
  <>
    <ExplodedLightingRig3D />
    <TechnicalSpotlight3D from={[-3, 5, 4]} to={[2.5, 4.5, 3]} startFrame={12} duration={72} />
    <ShadowStage3D />
    <CameraOrbitMove3D radius={7.2} height={2.5} startAngle={-0.9} endAngle={0.85} duration={120}>
      <Model />
    </CameraOrbitMove3D>
  </>
);

export const ExplodedCameraLightingShowcase: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(145deg,#07111d,#1b2b3b)" }}>
    <ThreeCanvas width={1920} height={1080} camera={{ position: [5, 3, 7], fov: 42 }}>
      <Scene />
    </ThreeCanvas>
    <div style={{ position: "absolute", left: 76, bottom: 54, color: "#dce7f1", fontFamily: "Arial", letterSpacing: 4, fontSize: 24, opacity: 0.82 }}>
      ADRIY PROJECT · CAMERA & LIGHTING
    </div>
  </AbsoluteFill>
);
