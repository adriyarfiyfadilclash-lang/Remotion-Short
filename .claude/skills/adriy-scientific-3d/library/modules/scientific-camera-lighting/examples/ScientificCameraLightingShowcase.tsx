import React from "react";
import { AbsoluteFill } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import {
  ScientificCameraRig3D,
  ScientificLabLighting3D,
} from "../src";

const Scene: React.FC = () => (
  <>
    <ScientificCameraRig3D from={[0.4, 0.2, 8]} to={[0.4, 0.2, 6.2]} duration={90} />
    <ScientificLabLighting3D />
    <mesh rotation={[0.35, 0.5, 0]}>
      <icosahedronGeometry args={[1.05, 2]} />
      <meshPhysicalMaterial color="#4bb8d9" metalness={0.22} roughness={0.24} clearcoat={0.8} />
    </mesh>
    <mesh rotation={[Math.PI / 2, 0.2, 0]} scale={1.55}>
      <torusGeometry args={[0.8, 0.018, 12, 96]} />
      <meshBasicMaterial color="#f1b75b" />
    </mesh>
    <mesh position={[1.7, -0.9, -0.4]} rotation={[0.4, 0.2, 0]}>
      <sphereGeometry args={[0.28, 32, 24]} />
      <meshStandardMaterial color="#bd8bf4" roughness={0.28} />
    </mesh>
  </>
);

export const ScientificCameraLightingShowcase: React.FC = () => (
  <AbsoluteFill style={{ background: "#071522" }}>
    <ThreeCanvas width={1920} height={1080} camera={{ position: [0, 0, 8], fov: 42 }}>
      <Scene />
    </ThreeCanvas>
    <div style={{ position: "absolute", left: 76, bottom: 58, color: "#e2edf5", fontFamily: "Arial, sans-serif", letterSpacing: 3, fontSize: 23 }}>
      ADRIY PROJECT · SCIENTIFIC CAMERA & LIGHTING
    </div>
  </AbsoluteFill>
);
