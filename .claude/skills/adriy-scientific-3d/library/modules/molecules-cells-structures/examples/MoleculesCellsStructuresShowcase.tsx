import React from "react";
import { AbsoluteFill } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import {
  Molecule3D,
  CellMembrane3D,
  CellNucleus3D,
  CellOrganelle3D,
  DNAHelix3D,
} from "../src";

const waterAtoms = [
  { id: "O", position: [0, 0, 0] as [number, number, number], radius: 0.24, color: "#e85d75" },
  { id: "H1", position: [-0.38, 0.27, 0] as [number, number, number], radius: 0.13, color: "#eaf5fc" },
  { id: "H2", position: [0.38, 0.27, 0] as [number, number, number], radius: 0.13, color: "#eaf5fc" },
];

const Scene: React.FC = () => (
  <>
    <ambientLight intensity={0.7} />
    <directionalLight position={[4, 5, 7]} intensity={1.8} />
    <group position={[-2.2, 0.35, 0]}>
      <Molecule3D
        atoms={waterAtoms}
        bonds={[{ from: "O", to: "H1" }, { from: "O", to: "H2" }]}
      />
    </group>
    <group position={[0.2, 0.2, 0]}>
      <CellMembrane3D radius={0.92} />
      <CellNucleus3D position={[0.08, 0.05, 0.18]} radius={0.3} />
      <CellOrganelle3D position={[-0.45, 0.28, 0.2]} color="#f4a261" />
      <CellOrganelle3D position={[0.42, -0.35, 0.1]} color="#65a8db" scale={[0.28, 0.12, 0.12]} rotation={[0, 0, 0.6]} />
      <CellOrganelle3D position={[-0.15, -0.52, -0.15]} color="#e9c46a" shape="torus" />
    </group>
    <group position={[2.3, 0, 0]}>
      <DNAHelix3D height={2.25} turns={2.1} radius={0.36} />
    </group>
  </>
);

export const MoleculesCellsStructuresShowcase: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(145deg,#06111e,#16364c)" }}>
    <ThreeCanvas width={1920} height={1080} camera={{ position: [0, 0, 7.8], fov: 42 }}>
      <Scene />
    </ThreeCanvas>
    <div style={{ position: "absolute", left: 76, bottom: 58, color: "#e2edf5", fontFamily: "Arial, sans-serif", letterSpacing: 3, fontSize: 23 }}>
      ADRIY PROJECT · MOLECULES / CELLS / STRUCTURES
    </div>
  </AbsoluteFill>
);
