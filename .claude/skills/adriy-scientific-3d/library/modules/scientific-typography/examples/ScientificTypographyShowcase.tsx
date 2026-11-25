import React from "react";
import { AbsoluteFill } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import {
  ScientificTitle3D,
  ScientificLabel3D,
  ScientificFormula3D,
  ScientificDataReadout3D,
  ScientificAxisLabel3D,
  ScientificLeaderLine3D,
  ScientificScaleBar3D,
} from "../src";

const Scene: React.FC = () => (
  <>
    <ambientLight intensity={0.6} />
    <directionalLight position={[4, 5, 6]} intensity={1.8} />
    <mesh position={[-1.1, 0, 0]}>
      <icosahedronGeometry args={[0.55, 2]} />
      <meshStandardMaterial color="#dca85b" metalness={0.35} roughness={0.3} />
    </mesh>
    <mesh position={[-1.1, 0, 0]} scale={1.55}>
      <torusGeometry args={[0.55, 0.012, 8, 72]} />
      <meshBasicMaterial color="#5cc9ed" />
    </mesh>

    <ScientificTitle3D text="ATOM STRUCTURE" position={[0, 2.05, 0]} />
    <ScientificLabel3D text="NUCLEUS" position={[-0.2, 0.25, 0.7]} />
    <ScientificLeaderLine3D points={[[-0.55, 0.1, 0.3], [-0.2, 0.25, 0.3], [0.35, 0.25, 0.3]]} startFrame={12} />
    <ScientificFormula3D formula="E = mc²" position={[1.25, 0.55, 0]} background />
    <ScientificDataReadout3D label="ENERGY LEVEL" value="13.6" unit="eV" position={[1.1, -0.05, 0]} />
    <ScientificAxisLabel3D text="X" position={[2.2, -1.05, 0]} />
    <ScientificAxisLabel3D text="Y" position={[1.65, -0.45, 0]} />
    <ScientificScaleBar3D length={0.9} divisions={3} label="1 nm" position={[0.95, -1.15, 0]} />
  </>
);

export const ScientificTypographyShowcase: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(145deg,#07111d,#17334a)" }}>
    <ThreeCanvas width={1920} height={1080} camera={{ position: [0, 0, 7], fov: 42 }}>
      <Scene />
    </ThreeCanvas>
    <div style={{ position: "absolute", left: 76, bottom: 58, color: "#e2edf5", fontFamily: "Arial, sans-serif", letterSpacing: 4, fontSize: 24, opacity: 0.85 }}>
      ADRIY PROJECT · SCIENTIFIC TYPOGRAPHY
    </div>
  </AbsoluteFill>
);
