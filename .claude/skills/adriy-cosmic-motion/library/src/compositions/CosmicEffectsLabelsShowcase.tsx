import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Canvas } from "@react-three/fiber";
import { Stars, Sphere } from "@react-three/drei";
import {
  CosmicCameraRig, CinematicSpaceLighting,
} from "../components/camera-lighting";
import {
  EnergyBurst3D, CosmicFlash3D, CosmicParticleBurst3D, EnergyHalo3D,
  Shockwave3D, CosmicMarker3D, CosmicInfoLabel3D,
} from "../components/cosmic-effects-labels";

const ShowcasePlanet: React.FC = () => {
  const frame = useCurrentFrame();
  return <group rotation={[0.12, frame / 100, 0.04]}>
    <Sphere args={[1.65, 48, 48]}>
      <meshStandardMaterial color="#245c9c" roughness={0.7} metalness={0.15} />
    </Sphere>
  </group>;
};

export const CosmicEffectsLabelsShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 25, 205, 239], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ background: "#020713", color: "white", fontFamily: "Arial, sans-serif" }}>
    <Canvas gl={{ antialias: true }} camera={{ position: [0, 2, 12], fov: 43 }}>
      <color attach="background" args={["#020713"]} />
      <fog attach="fog" args={["#020713", 18, 65]} />
      <Stars radius={85} depth={50} count={1400} factor={3.5} saturation={0.5} fade speed={0.25} />
      <ShowcasePlanet />
      <EnergyHalo3D radius={2.05} color="#60dfff" rotationSpeed={0.008} />
      <EnergyBurst3D position={[0, 0, -0.2]} startFrame={40} durationInFrames={45} maxRadius={5.5} />
      <CosmicFlash3D position={[0, 0, 0]} startFrame={40} durationInFrames={10} />
      <CosmicParticleBurst3D position={[0, 0, 0]} startFrame={40} durationInFrames={65} count={55} radius={5.4} />
      <Shockwave3D position={[0, -0.3, 0]} startFrame={55} durationInFrames={58} endRadius={6.5} />
      <CosmicMarker3D position={[1.3, 1.4, 0]} label="ENERGY CORE" color="#7fe3ff" lineLength={1.1} />
      <CosmicInfoLabel3D position={[-3.7, -2.2, 0]} title="COSMIC EVENT" description="Gelombang energi menyebar dari pusat objek." width={245} />
      <CosmicCameraRig from={[0, 2.2, 13]} to={[0.5, 1.1, 9.5]} durationInFrames={240} />
      <CinematicSpaceLighting keyIntensity={1.7} fillIntensity={0.55} rimIntensity={1.25} />
    </Canvas>
    <div style={{ position: "absolute", left: 72, right: 72, bottom: 68, opacity }}>
      <div style={{ color: "#78dfff", fontSize: 14, letterSpacing: 4 }}>ADRIY COSMIC MOTION / STAGE 06</div>
      <div style={{ fontSize: 45, fontWeight: 800, marginTop: 10 }}>COSMIC EFFECTS &amp; LABELS</div>
      <div style={{ fontSize: 17, color: "#aabbd2", marginTop: 8 }}>Efek energi, partikel, gelombang kejut, dan penanda informasi</div>
    </div>
  </AbsoluteFill>;
};
