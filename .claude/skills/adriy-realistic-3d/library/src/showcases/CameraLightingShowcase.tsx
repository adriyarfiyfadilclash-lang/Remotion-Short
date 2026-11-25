import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { CinematicCamera3D, StudioLighting3D, ShadowGround3D, SpotlightSweep3D } from "../modules/camera-lighting";

const Subject: React.FC = () => {
  const frame = useCurrentFrame();
  const turn = interpolate(frame, [0, 150], [0, Math.PI * 2], { extrapolateRight: "clamp" });
  return (
    <group rotation={[0, turn, 0]}>
      <mesh castShadow position={[0, 0, 0]}>
        <torusKnotGeometry args={[0.78, 0.24, 180, 24]} />
        <meshStandardMaterial color="#b9c8d9" metalness={0.82} roughness={0.2} />
      </mesh>
      <mesh castShadow position={[0, -1.15, 0]}>
        <cylinderGeometry args={[1.15, 1.15, 0.18, 64]} />
        <meshStandardMaterial color="#252d3a" metalness={0.65} roughness={0.28} />
      </mesh>
    </group>
  );
};

export const CameraLightingShowcase: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(145deg,#080d17,#202b3b)", color: "white" }}>
    <ThreeCanvas width={1920} height={1080} shadows camera={{ position: [0, 1.5, 7], fov: 42 }}>
      <CinematicCamera3D from={[0, 1.6, 8]} to={[0, 0.6, 5.2]} lookAt={[0, -0.1, 0]} />
      <StudioLighting3D />
      <SpotlightSweep3D from={[-4, 5, 2]} to={[4, 5, 2]} intensity={2.2} />
      <ShadowGround3D y={-1.28} />
      <Subject />
    </ThreeCanvas>
    <div style={{ position: "absolute", left: 90, bottom: 65, fontFamily: "Arial", letterSpacing: 5, fontSize: 26, opacity: 0.8 }}>ADRIY PROJECT · REALISTIC 3D</div>
  </AbsoluteFill>
);
