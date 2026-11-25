import React from "react";
import { AbsoluteFill } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import {
  ExplodedComponent3D,
  AssemblyConnector3D,
  Fastener3D,
  ExplodedLightingRig3D,
  CameraOrbitMove3D,
  ShadowStage3D,
  ExplodedParticleField3D,
  ExplodedPulseRing3D,
  ExplodedDust3D,
  ExplodedEnergyArc3D,
  ExplodedLabel3D,
  ComponentNumber3D,
  LeaderLine3D,
} from "./index";

const ExplodedModel: React.FC = () => (
  <>
    {/* Lampu dan panggung */}
    <ExplodedLightingRig3D />
    <ShadowStage3D y={-1.65} color="#0b1723" />

    {/* Badan utama */}
    <mesh position={[0, 0, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[0.82, 0.82, 0.48, 64]} />
      <meshStandardMaterial color="#71899a" metalness={0.82} roughness={0.25} />
    </mesh>
    <mesh position={[0, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.55, 0.055, 16, 64]} />
      <meshStandardMaterial color="#b7c7d2" metalness={0.85} roughness={0.2} />
    </mesh>

    {/* Cincin atas yang terurai */}
    <ExplodedComponent3D
      assembledAt={[0, 0.28, 0]}
      separatedBy={[0, 1.25, 0]}
      startFrame={18}
      duration={42}
    >
      <mesh castShadow>
        <torusGeometry args={[0.62, 0.12, 24, 64]} />
        <meshStandardMaterial color="#d6a653" metalness={0.78} roughness={0.2} />
      </mesh>
    </ExplodedComponent3D>

    {/* Poros bawah */}
    <ExplodedComponent3D
      assembledAt={[0, -0.22, 0]}
      separatedBy={[0, -1.05, 0]}
      startFrame={30}
      duration={42}
    >
      <mesh castShadow>
        <cylinderGeometry args={[0.19, 0.19, 0.72, 32]} />
        <meshStandardMaterial color="#79b7d1" metalness={0.86} roughness={0.18} />
      </mesh>
    </ExplodedComponent3D>

    {/* Baut kiri dan kanan */}
    {[-1, 1].map((side) => (
      <ExplodedComponent3D
        key={side}
        assembledAt={[side * 0.5, 0.2, 0.2]}
        separatedBy={[side * 0.75, 0.75, 0.35]}
        startFrame={38}
        duration={36}
      >
        <Fastener3D size={0.085} length={0.28} />
      </ExplodedComponent3D>
    ))}

    {/* Garis posisi dan penunjuk */}
    <AssemblyConnector3D start={[0, 0.4, 0]} end={[0, 1.42, 0]} />
    <AssemblyConnector3D start={[0, -0.4, 0]} end={[0, -1.25, 0]} />
    <LeaderLine3D points={[[0.7, 1.3, 0], [1.25, 1.55, 0], [1.9, 1.55, 0]]} startFrame={48} duration={28} />
    <ExplodedLabel3D text="RING ATAS" position={[1.95, 1.55, 0]} startFrame={50} />
    <ComponentNumber3D number="01" position={[-1.05, 1.45, 0.2]} startFrame={46} />

    {/* Efek penekanan */}
    <ExplodedParticleField3D count={55} startFrame={28} duration={55} seed={29} />
    <ExplodedPulseRing3D position={[0, -1.42, 0]} startFrame={44} duration={40} repeat />
    <ExplodedDust3D count={32} />
    <ExplodedEnergyArc3D
      points={[[1.15, -0.3, 0.2], [1.45, 0.05, 0.35], [1.3, 0.45, 0.2], [1.65, 0.8, 0.1]]}
      startFrame={55}
      duration={36}
    />
  </>
);

export const ExplodedViewFinalShowcase: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(145deg,#06101b,#1b2c3d)" }}>
    <ThreeCanvas width={1920} height={1080} camera={{ position: [5, 3.2, 8], fov: 42 }}>
      <CameraOrbitMove3D radius={8.1} height={2.8} startAngle={-0.8} endAngle={0.72} duration={180}>
        <ExplodedModel />
      </CameraOrbitMove3D>
    </ThreeCanvas>
    <div style={{
      position: "absolute", left: 76, top: 66, color: "#e5edf4",
      fontFamily: "Arial, sans-serif", letterSpacing: 5, fontSize: 22, opacity: 0.78
    }}>
      ADRIY PROJECT
    </div>
    <div style={{
      position: "absolute", left: 76, bottom: 58, color: "#e5edf4",
      fontFamily: "Arial, sans-serif", fontSize: 34, fontWeight: 700, letterSpacing: 2
    }}>
      EXPLODED VIEW
    </div>
    <div style={{
      position: "absolute", right: 76, bottom: 64, color: "#83cbe9",
      fontFamily: "Arial, sans-serif", fontSize: 16, letterSpacing: 3
    }}>
      ENGINEERING VISUALIZATION
    </div>
  </AbsoluteFill>
);
