import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import {
  FogEnvironment3D, ProceduralSkyDome3D, Starfield3D, DustMotes3D,
  ParticleAtmosphere3D, FloatingDebris3D, ShockwaveRing3D,
  EnergyAura3D, ProceduralGround3D,
} from "../modules/environment-fx";

const Core: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <group rotation={[0, frame * 0.003, 0]}>
      <mesh castShadow>
        <icosahedronGeometry args={[0.9, 2]} />
        <meshStandardMaterial color="#4da9d8" metalness={0.75} roughness={0.22} emissive="#06334d" emissiveIntensity={0.65} />
      </mesh>
      <EnergyAura3D radius={1.35} />
    </group>
  );
};

export const EnvironmentFXShowcase: React.FC = () => (
  <AbsoluteFill style={{ background: "#07111e" }}>
    <ThreeCanvas width={1920} height={1080} camera={{ position: [0, 1.1, 7], fov: 45 }}>
      <ProceduralSkyDome3D />
      <FogEnvironment3D color="#101827" near={8} far={28} />
      <ambientLight intensity={0.45} />
      <pointLight position={[3, 4, 4]} intensity={2.5} color="#8bdcff" />
      <pointLight position={[-4, 1, -3]} intensity={2} color="#5b72ff" />
      <Starfield3D count={650} />
      <DustMotes3D count={160} />
      <ParticleAtmosphere3D count={220} />
      <FloatingDebris3D count={22} />
      <ProceduralGround3D y={-1.35} />
      <Core />
      <ShockwaveRing3D y={-1.3} duration={48} maxRadius={4.5} />
    </ThreeCanvas>
    <div style={{ position: "absolute", left: 82, bottom: 58, color: "#dceaff", fontFamily: "Arial", letterSpacing: 5, fontSize: 24, opacity: 0.75 }}>ADRIY PROJECT · ENVIRONMENT & FX</div>
  </AbsoluteFill>
);
