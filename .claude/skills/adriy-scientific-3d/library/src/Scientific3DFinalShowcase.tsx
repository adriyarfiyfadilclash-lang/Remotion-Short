import React from "react";
import { AbsoluteFill } from "remotion";
import { ThreeCanvas } from "@remotion/three";

import {
  ScientificObjectMotion3D,
  ScientificWave3D,
  ParticleFlow3D,
  MolecularVibration3D,
  CellPulse3D,
  GrowthSequence3D,
} from "../modules/scientific-animation/src";
import { ScientificDissolveTransition } from "../modules/scientific-transition/src";
import {
  ScientificTitle3D,
  ScientificLabel3D,
  ScientificFormula3D,
  ScientificDataReadout3D,
  ScientificLeaderLine3D,
  ScientificScaleBar3D,
} from "../modules/scientific-typography/src";
import {
  Molecule3D,
  CellMembrane3D,
  CellNucleus3D,
  CellOrganelle3D,
  DNAHelix3D,
} from "../modules/molecules-cells-structures/src";
import {
  ScientificCameraRig3D,
  ScientificLabLighting3D,
} from "../modules/scientific-camera-lighting/src";
import {
  ScientificParticleField3D,
  ScientificScanPlane3D,
  ScientificEnergyPulse3D,
  ScientificWaveField3D,
  ScientificGlowShell3D,
  ScientificSparkBurst3D,
  ScientificDataBeam3D,
} from "../modules/scientific-effects/src";

const waterAtoms = [
  { id: "O", position: [0, 0, 0] as [number, number, number], radius: 0.22, color: "#e86b79" },
  { id: "H1", position: [-0.34, 0.25, 0] as [number, number, number], radius: 0.12, color: "#f3f7fb" },
  { id: "H2", position: [0.34, 0.25, 0] as [number, number, number], radius: 0.12, color: "#f3f7fb" },
];

const ScientificScene: React.FC = () => (
  <>
    <ScientificCameraRig3D
      from={[0.15, 0.35, 9.2]}
      to={[0.15, 0.2, 7.8]}
      lookAt={[0, 0, 0]}
      duration={150}
    />
    <ScientificLabLighting3D
      ambientIntensity={0.55}
      keyIntensity={1.85}
      fillIntensity={0.6}
      rimIntensity={20}
      backgroundColor="#061321"
    />

    <ScientificParticleField3D count={220} radius={5.2} pointSize={0.025} seed={41} />
    <ScientificWaveField3D
      position={[0, -1.65, -0.7]}
      width={7.5}
      depth={2.2}
      rows={9}
      columns={48}
      amplitude={0.12}
      color="#1b7899"
      lineWidth={0.8}
    />

    <ScientificDissolveTransition startFrame={0} duration={36}>
      {/* Molecule: water */}
      <ScientificObjectMotion3D
        from={[-2.35, 0.2, 0]}
        to={[-2.15, 0.2, 0]}
        startFrame={8}
        duration={70}
        rotationFrom={[0, -0.25, 0]}
        rotationTo={[0, 0.35, 0]}
      >
        <MolecularVibration3D amplitude={0.025} frequency={0.16}>
          <Molecule3D
            atoms={waterAtoms}
            bonds={[
              { from: "O", to: "H1", radius: 0.035 },
              { from: "O", to: "H2", radius: 0.035 },
            ]}
            atomPulse
          />
        </MolecularVibration3D>
        <ScientificGlowShell3D radius={0.72} opacity={0.08} color="#58c9ed" />
        <ScientificEnergyPulse3D radius={0.62} position={[0, 0, 0]} color="#5ddcff" speed={0.025} />
      </ScientificObjectMotion3D>

      {/* Cell: membrane, nucleus and conceptual organelles */}
      <ScientificObjectMotion3D
        from={[0.1, -0.05, 0]}
        to={[0.1, 0.05, 0]}
        startFrame={20}
        duration={90}
        rotationFrom={[0.05, -0.35, 0]}
        rotationTo={[0.12, 0.22, 0]}
      >
        <GrowthSequence3D startFrame={12} duration={72} fromScale={0.78} toScale={1}>
          <CellPulse3D amount={0.025} frequency={0.09}>
            <CellMembrane3D radius={1.05} color="#43c9b1" opacity={0.2} />
            <CellNucleus3D position={[0.08, 0.05, 0.2]} radius={0.34} />
            <CellOrganelle3D position={[-0.52, 0.3, 0.18]} color="#f2a65a" scale={[0.27, 0.13, 0.13]} rotation={[0, 0, 0.4]} />
            <CellOrganelle3D position={[0.5, -0.28, 0.12]} color="#64a8d8" scale={[0.26, 0.12, 0.12]} rotation={[0, 0, -0.5]} />
            <CellOrganelle3D position={[-0.25, -0.58, -0.12]} color="#e8c66b" shape="torus" scale={[0.2, 0.2, 0.2]} />
          </CellPulse3D>
        </GrowthSequence3D>
        <ScientificGlowShell3D radius={1.22} color="#5ee6cb" opacity={0.07} />
        <ScientificEnergyPulse3D radius={1.18} color="#65e8d0" speed={0.018} />
      </ScientificObjectMotion3D>

      {/* DNA helix */}
      <ScientificObjectMotion3D
        from={[2.35, 0.05, 0]}
        to={[2.35, 0.12, 0]}
        startFrame={14}
        duration={80}
        rotationFrom={[0, -0.18, 0]}
        rotationTo={[0.12, 0.5, 0]}
      >
        <GrowthSequence3D startFrame={28} duration={80} fromScale={0.72} toScale={1}>
          <DNAHelix3D height={2.45} turns={2.2} radius={0.38} steps={110} />
        </GrowthSequence3D>
        <ScientificGlowShell3D radius={0.82} color="#65c9f5" opacity={0.06} />
      </ScientificObjectMotion3D>
    </ScientificDissolveTransition>

    {/* Animated scientific effects and data flow */}
    <ScientificScanPlane3D
      position={[0.1, 0, 0.5]}
      width={5.9}
      depth={3.6}
      startY={-1.75}
      endY={1.75}
      startFrame={55}
      duration={115}
      opacity={0.12}
    />
    <ParticleFlow3D
      count={34}
      from={[-3.4, -0.8, 0.25]}
      to={[3.4, -0.8, 0.25]}
      duration={105}
      startFrame={20}
      color="#78dfff"
      size={0.018}
      seed={23}
    />
    <ScientificDataBeam3D
      start={[-1.2, 1.05, 0.3]}
      end={[1.2, 1.05, 0.3]}
      startFrame={65}
      duration={75}
      color="#f3c875"
    />
    <ScientificSparkBurst3D position={[0.1, 0.1, 0.65]} startFrame={150} duration={38} count={32} />
    <ScientificWave3D amplitude={0.14} frequency={2.4} speed={0.075} length={2.2} segments={48} color="#7bd8ee" axis="x" />

    {/* Typography and annotations */}
    <ScientificTitle3D text="MICRO WORLD" position={[0, 2.12, 0]} fontSize={0.38} startFrame={0} duration={32} />
    <ScientificLabel3D text="H₂O MOLECULE" position={[-3.2, -1.05, 0.35]} fontSize={0.13} />
    <ScientificLabel3D text="CELL STRUCTURE" position={[-0.8, -1.35, 0.35]} fontSize={0.13} />
    <ScientificLabel3D text="DNA DOUBLE HELIX" position={[1.55, -1.3, 0.35]} fontSize={0.13} />
    <ScientificLeaderLine3D points={[[-2.2, 0.25, 0.2], [-2.55, -0.45, 0.2], [-2.95, -0.75, 0.2]]} startFrame={38} duration={28} />
    <ScientificFormula3D formula="H₂O  ·  DNA  ·  CELL" position={[0, -2.05, 0]} fontSize={0.17} color="#f0c879" />
    <ScientificDataReadout3D label="VISUAL MODE" value="CONCEPTUAL" position={[2.55, 1.1, 0.25]} fontSize={0.105} />
    <ScientificScaleBar3D length={0.7} divisions={4} label="SCHEMATIC SCALE" position={[2.6, -1.8, 0.25]} fontSize={0.09} color="#a9d8ec" />
  </>
);

export const Scientific3DFinalShowcase: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(145deg,#061321,#102d43)" }}>
    <ThreeCanvas width={1920} height={1080} camera={{ position: [0, 0, 9.2], fov: 42 }}>
      <ScientificScene />
    </ThreeCanvas>
    <div
      style={{
        position: "absolute",
        left: 76,
        right: 76,
        bottom: 48,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#dcecf5",
        fontFamily: "Arial, sans-serif",
        letterSpacing: 2.4,
        fontSize: 20,
        textShadow: "0 2px 12px rgba(0,0,0,.45)",
      }}
    >
      <span>ADRIY PROJECT · SCIENTIFIC 3D</span>
      <span>MICROSTRUCTURE EXPLORATION</span>
    </div>
  </AbsoluteFill>
);
