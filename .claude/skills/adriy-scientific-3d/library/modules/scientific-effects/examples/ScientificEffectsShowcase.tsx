import React from "react";
import { AbsoluteFill } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import {
  ScientificParticleField3D,
  ScientificScanPlane3D,
  ScientificEnergyPulse3D,
  ScientificWaveField3D,
  ScientificGlowShell3D,
  ScientificSparkBurst3D,
} from "../src";

const Scene: React.FC = () => (
  <>
    <ambientLight intensity={0.55} />
    <pointLight position={[3, 4, 5]} intensity={22} color="#8adfff" />
    <ScientificParticleField3D count={180} radius={4.2} />
    <ScientificGlowShell3D radius={0.92} position={[-1.45, 0.25, 0]} />
    <mesh position={[-1.45, 0.25, 0]}>
      <icosahedronGeometry args={[0.58, 2]} />
      <meshStandardMaterial color="#4b9fc5" metalness={0.25} roughness={0.25} />
    </mesh>
    <ScientificEnergyPulse3D position={[-1.45, 0.25, 0]} color="#67ddff" />
    <ScientificScanPlane3D position={[0.45, 0.1, 0]} width={1.9} depth={1.9} startY={-1.4} endY={1.4} />
    <ScientificWaveField3D position={[2.25, -0.55, 0]} width={2.1} depth={1.5} rows={8} columns={26} />
    <ScientificSparkBurst3D position={[0.45, 0.1, 0.2]} startFrame={18} />
  </>
);

export const ScientificEffectsShowcase: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(145deg,#06111e,#16364c)" }}>
    <ThreeCanvas width={1920} height={1080} camera={{ position: [0, 0, 8], fov: 42 }}>
      <Scene />
    </ThreeCanvas>
    <div style={{ position: "absolute", left: 76, bottom: 58, color: "#e2edf5", fontFamily: "Arial, sans-serif", letterSpacing: 3, fontSize: 23 }}>
      ADRIY PROJECT · SCIENTIFIC EFFECTS
    </div>
  </AbsoluteFill>
);
