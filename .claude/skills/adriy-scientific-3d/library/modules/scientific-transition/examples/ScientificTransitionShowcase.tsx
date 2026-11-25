import React from "react";
import { AbsoluteFill } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import {
  ScientificDissolveTransition,
  ScientificScanTransition,
  ScientificDataCutTransition,
  ScientificRadialReveal,
} from "../src";

const Scene: React.FC = () => (
  <>
    <ambientLight intensity={0.55} />
    <directionalLight position={[4, 5, 6]} intensity={2} />
    <ScientificDissolveTransition startFrame={0} duration={32}>
      <mesh>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial color="#e7ae5a" metalness={0.25} roughness={0.3} />
      </mesh>
    </ScientificDissolveTransition>
    <ScientificRadialReveal startFrame={22} duration={38}>
      <mesh position={[1.5, 0, 0]}>
        <torusGeometry args={[0.65, 0.12, 20, 48]} />
        <meshStandardMaterial color="#69ccef" metalness={0.5} roughness={0.24} />
      </mesh>
    </ScientificRadialReveal>
    <ScientificScanTransition startFrame={8} duration={52} />
    <ScientificDataCutTransition startFrame={18} duration={42} />
  </>
);

export const ScientificTransitionShowcase: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(145deg,#07111d,#17334a)" }}>
    <ThreeCanvas width={1920} height={1080} camera={{ position: [0, 0, 7], fov: 42 }}>
      <Scene />
    </ThreeCanvas>
    <div style={{ position: "absolute", left: 76, bottom: 58, color: "#e2edf5", fontFamily: "Arial, sans-serif", letterSpacing: 4, fontSize: 24, opacity: 0.85 }}>
      ADRIY PROJECT · SCIENTIFIC TRANSITION
    </div>
  </AbsoluteFill>
);
