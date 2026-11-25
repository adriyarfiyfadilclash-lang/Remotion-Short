import React from "react";
import { useCurrentFrame } from "remotion";
import { Environment, Sphere, Torus, MeshStandardMaterial } from "@react-three/drei";
import {
  AnatomicalFinalComposition, AnatomicalSequenceDirector, OrganFocusSequence,
  DissectionExplainerScene
} from "../index";
import {
  AnatomyCameraRig, MedicalStudioLighting, OrganHighlightEffect,
  ScanSweepEffect, MedicalCalloutLabel, AnatomyLeaderLine
} from "../index";

const FinalScene: React.FC<{frame:number}> = ({frame}) => <>
  <AnatomyCameraRig frame={frame} position={[0,0.2,5.8]} orbitRadius={0.18} orbitSpeed={0.008}/>
  <MedicalStudioLighting intensity={1.35}/>
  <Environment preset="studio"/>
  <AnatomicalSequenceDirector frame={frame} segmentFrames={[50,55,55,50]} loop>
    <group>
      <Sphere args={[0.95,48,36]}>
        <MeshStandardMaterial color="#b66b78" roughness={0.38}/>
      </Sphere>
      <OrganHighlightEffect frame={frame} position={[0,0,0.8]} radius={0.65} color="#ff647c"/>
    </group>
    <group>
      <Sphere args={[0.85,48,36]}>
        <MeshStandardMaterial color="#83c9de" roughness={0.3} transparent opacity={0.5}/>
      </Sphere>
      <ScanSweepEffect frame={frame} width={2.5} height={2.2} position={[0,0,0.95]}/>
    </group>
    <group>
      <DissectionExplainerScene frame={frame} revealAt={0} hideAt={100}>
        <Sphere args={[0.72,40,32]}>
          <MeshStandardMaterial color="#d38b83" roughness={0.45}/>
        </Sphere>
        <Torus args={[1.05,0.025,8,64]}>
          <meshBasicMaterial color="#f0d17d"/>
        </Torus>
      </DissectionExplainerScene>
    </group>
    <group>
      <OrganFocusSequence frame={frame} startFrame={0} endFrame={210}>
        <Sphere args={[0.9,48,36]}>
          <MeshStandardMaterial color="#c56d79" roughness={0.3}/>
        </Sphere>
        <OrganHighlightEffect frame={frame} position={[0,0,0.85]} color="#f3c66f" radius={0.82}/>
      </OrganFocusSequence>
    </group>
  </AnatomicalSequenceDirector>
  <AnatomyLeaderLine points={[[0.55,0.35,0.75],[1.1,0.75,0.75],[1.55,0.75,0.75]]}/>
  <MedicalCalloutLabel title="STRUKTUR ORGAN" detail="Visualisasi anatomi" position={[1.7,0.82,0.75]}/>
</>;

export const AnatomicalFinalProjectShowcase: React.FC = () => {
  const frame=useCurrentFrame();
  const chapter=Math.floor(frame/52)%4;
  const titles=["STRUKTUR ANATOMI","LAPISAN TRANSPARAN","PROSES PEMBEDAHAN","SOROTAN ORGAN"];
  const subtitles=[
    "Pengenalan bentuk dan posisi struktur tubuh.",
    "Menampilkan lapisan secara konseptual.",
    "Memisahkan bagian untuk menjelaskan struktur internal.",
    "Memusatkan perhatian pada bagian anatomi yang dibahas."
  ];
  return <AnatomicalFinalComposition
    title={titles[chapter]}
    subtitle={subtitles[chapter]}
    frameLabel={`ADRIY.PROJECT • FRAME ${frame} • 1920 × 1080 • 30 FPS`}
    cameraPosition={[0,0.2,5.8]}
  >
    <FinalScene frame={frame}/>
  </AnatomicalFinalComposition>;
};
