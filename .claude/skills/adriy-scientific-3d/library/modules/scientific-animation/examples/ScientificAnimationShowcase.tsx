import React from "react";
import { AbsoluteFill } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import {
  ScientificObjectMotion3D,
  ScientificOrbit3D,
  ScientificWave3D,
  ParticleFlow3D,
  MolecularVibration3D,
  CellPulse3D,
  GrowthSequence3D,
} from "../src";

const Scene: React.FC = () => (
  <>
    <ambientLight intensity={0.65} />
    <directionalLight position={[4, 5, 6]} intensity={2} />
    <pointLight position={[-3, 2, 2]} intensity={15} color="#49c9ff" />

    {/* Ilustrasi inti atom dan orbit */}
    <CellPulse3D amount={0.045} frequency={0.14}>
      <mesh>
        <icosahedronGeometry args={[0.42, 2]} />
        <meshStandardMaterial color="#e0a85b" metalness={0.35} roughness={0.28} />
      </mesh>
    </CellPulse3D>

    {[0, 1, 2].map((i) => (
      <mesh key={i} rotation={[Math.PI / 2 + i * 0.7, i * 0.45, i * 0.2]}>
        <torusGeometry args={[1.05 + i * 0.12, 0.012, 8, 80]} />
        <meshBasicMaterial color={i === 1 ? "#efbd65" : "#55c9f2"} />
      </mesh>
    ))}

    {[0, 1, 2].map((i) => (
      <ScientificOrbit3D key={i} radius={1.05 + i * 0.12} height={0.12 * (i - 1)} startAngle={i * 1.9} endAngle={i * 1.9 + Math.PI * 2} duration={120 + i * 20}>
        <mesh>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshStandardMaterial color="#78dcff" emissive="#1b789b" emissiveIntensity={0.6} />
        </mesh>
      </ScientificOrbit3D>
    ))}

    {/* Gelombang dan aliran partikel */}
    <ScientificWave3D amplitude={0.28} frequency={2.2} speed={0.1} length={5} />
    <ParticleFlow3D count={28} from={[-2.5, -1.25, 0]} to={[2.5, -1.25, 0]} duration={100} />

    {/* Getaran molekul ilustratif */}
    <ScientificObjectMotion3D from={[-1.8, 1.2, 0]} to={[-1.8, 1.2, 0]} startFrame={0}>
      <MolecularVibration3D amplitude={0.12} frequency={0.28}>
        <mesh>
          <sphereGeometry args={[0.16, 20, 20]} />
          <meshStandardMaterial color="#e98b75" />
        </mesh>
      </MolecularVibration3D>
    </ScientificObjectMotion3D>

    {/* Pertumbuhan objek sederhana */}
    <GrowthSequence3D startFrame={25} duration={55} fromScale={0.05} toScale={0.42} fromY={-1.35} toY={-0.85}>
      <mesh>
        <dodecahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#75c9a4" roughness={0.35} />
      </mesh>
    </GrowthSequence3D>
  </>
);

export const ScientificAnimationShowcase: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(145deg,#07111d,#132d43)" }}>
    <ThreeCanvas width={1920} height={1080} camera={{ position: [4.8, 3.2, 7.5], fov: 42 }}>
      <Scene />
    </ThreeCanvas>
    <div style={{ position: "absolute", left: 76, bottom: 58, color: "#e2edf5", fontFamily: "Arial, sans-serif", letterSpacing: 4, fontSize: 24, opacity: 0.85 }}>
      ADRIY PROJECT · SCIENTIFIC ANIMATION
    </div>
  </AbsoluteFill>
);
