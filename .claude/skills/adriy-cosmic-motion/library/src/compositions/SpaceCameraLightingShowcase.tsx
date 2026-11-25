import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Canvas } from "@react-three/fiber";
import { Sphere, Stars, OrbitControls } from "@react-three/drei";
import {
  CosmicCameraRig, PlanetFocusCamera, DeepSpaceCamera, StarLightRig,
  PlanetRimLighting, NebulaVolumetricLighting, CinematicSpaceLighting,
} from "../components/camera-lighting";

const Planet: React.FC = () => {
  const frame = useCurrentFrame();
  const rotation = frame / 80;
  return <group rotation={[0, rotation, 0]}>
    <Sphere args={[2.1, 64, 64]}>
      <meshStandardMaterial color="#2262a8" roughness={0.68} metalness={0.12} />
    </Sphere>
    <mesh rotation={[0.25, 0.2, 0.08]}>
      <torusGeometry args={[2.22, 0.055, 12, 160]} />
      <meshBasicMaterial color="#79cfff" transparent opacity={0.72} />
    </mesh>
  </group>;
};

export const SpaceCameraLightingShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [8, 35, 200, 235], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ background: "#030713", color: "white", fontFamily: "Arial, sans-serif" }}>
    <Canvas gl={{ antialias: true }} camera={{ position: [0, 2, 13], fov: 42 }}>
      <color attach="background" args={["#030713"]} />
      <fog attach="fog" args={["#030713", 22, 70]} />
      <Stars radius={90} depth={55} count={1800} factor={4} saturation={0.4} fade speed={0.35} />
      <Planet />
      <CosmicCameraRig from={[0, 2.5, 15]} to={[1.8, 1.1, 8.5]} lookAt={[0, 0, 0]} durationInFrames={240} />
      <StarLightRig position={[5, 6, 7]} intensity={2.6} />
      <PlanetRimLighting />
      <NebulaVolumetricLighting intensity={1.25} />
      <CinematicSpaceLighting keyIntensity={1.2} fillIntensity={0.45} rimIntensity={0.9} />
    </Canvas>
    <div style={{ position: "absolute", left: 76, right: 76, bottom: 72, opacity: titleOpacity }}>
      <div style={{ fontSize: 15, letterSpacing: 5, color: "#77cfff" }}>ADRIY COSMIC MOTION / STAGE 05</div>
      <div style={{ fontSize: 48, fontWeight: 700, marginTop: 12 }}>SPACE CAMERA &amp; LIGHTING</div>
      <div style={{ fontSize: 18, color: "#aabbd2", marginTop: 10 }}>Pergerakan kamera sinematik dan pencahayaan ruang angkasa</div>
    </div>
  </AbsoluteFill>;
};
