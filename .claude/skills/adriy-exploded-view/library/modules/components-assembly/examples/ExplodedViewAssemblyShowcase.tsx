import React from "react";
import { AbsoluteFill } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import {
  ExplodedComponent3D,
  AssemblyConnector3D,
  ComponentSocket3D,
  Fastener3D,
  AssemblyStep3D,
  AssemblyGuide3D,
} from "../src";

const Scene: React.FC = () => (
  <>
    <ambientLight intensity={0.6} />
    <directionalLight position={[4, 6, 5]} intensity={2.4} />
    <pointLight position={[-3, 2, 3]} intensity={18} color="#56bde8" />
    <mesh position={[0, -1.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#111d2a" roughness={0.9} />
    </mesh>

    {/* Main housing */}
    <mesh position={[0, 0, 0]} castShadow>
      <cylinderGeometry args={[0.78, 0.78, 0.42, 64]} />
      <meshStandardMaterial color="#6c8294" metalness={0.78} roughness={0.28} />
    </mesh>
    <ComponentSocket3D position={[0, 0.24, 0]} radius={0.38} />

    {/* Exploded upper ring */}
    <ExplodedComponent3D assembledAt={[0, 0.25, 0]} separatedBy={[0, 1.25, 0]} startFrame={10} duration={38}>
      <mesh castShadow>
        <torusGeometry args={[0.58, 0.12, 24, 64]} />
        <meshStandardMaterial color="#d8a957" metalness={0.76} roughness={0.22} />
      </mesh>
    </ExplodedComponent3D>

    {/* Shaft */}
    <ExplodedComponent3D assembledAt={[0, -0.25, 0]} separatedBy={[0, -1.1, 0]} startFrame={22} duration={38}>
      <mesh castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.75, 32]} />
        <meshStandardMaterial color="#7eb9d2" metalness={0.82} roughness={0.2} />
      </mesh>
    </ExplodedComponent3D>

    {/* Fasteners, shown as individual parts */}
    {[-1, 1].map((x) => (
      <ExplodedComponent3D key={x} assembledAt={[x * 0.5, 0.18, 0.22]} separatedBy={[x * 0.45, 0.85, 0.35]} startFrame={28} duration={34}>
        <Fastener3D size={0.085} length={0.28} />
      </ExplodedComponent3D>
    ))}

    <AssemblyConnector3D start={[0, 0.4, 0]} end={[0, 1.35, 0]} />
    <AssemblyConnector3D start={[0, -0.4, 0]} end={[0, -1.25, 0]} />
    <AssemblyGuide3D points={[[1.35, 1.3, 0], [1.65, 0.95, 0], [1.55, 0.4, 0]]} startFrame={20} duration={30} />

    <AssemblyStep3D stepStart={64} stepDuration={28} from={[-2.0, 0.8, 0]} to={[-1.35, 0.8, 0]}>
      <Fastener3D position={[0, 0, 0]} size={0.08} />
    </AssemblyStep3D>
  </>
);

export const ExplodedViewAssemblyShowcase: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(145deg,#07111d,#1b2b3b)" }}>
    <ThreeCanvas width={1920} height={1080} camera={{ position: [4.6, 2.8, 8], fov: 42 }}>
      <Scene />
    </ThreeCanvas>
    <div style={{ position: "absolute", left: 76, bottom: 54, color: "#dce7f1", fontFamily: "Arial", letterSpacing: 4, fontSize: 24, opacity: 0.82 }}>
      ADRIY PROJECT · COMPONENTS & ASSEMBLY
    </div>
  </AbsoluteFill>
);
