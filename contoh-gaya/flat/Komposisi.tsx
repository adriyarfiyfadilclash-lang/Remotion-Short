// Contoh gaya ADRIY Flat Design 2.0 (9:16) — tiga komposisi berbeda dengan identitas sama:
// EP01 Flat 2.5D (pemandangan berlapis), EP02 Flat + Motion Graphics (kubus isometrik & angka kinetik),
// EP03 Flat + Exploded/Cutaway (rumah isometrik dibedah).
import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Ep1Air } from "./Ep1Air";
import { Ep2Udara } from "./Ep2Udara";
import { Ep3Listrik } from "./Ep3Listrik";

export const ContohFlat: React.FC = () => (
  <AbsoluteFill style={{ background: "#EEF3FB" }}>
    <Sequence durationInFrames={110}><Ep1Air /></Sequence>
    <Sequence from={110} durationInFrames={110}><Ep2Udara /></Sequence>
    <Sequence from={220} durationInFrames={110}><Ep3Listrik /></Sequence>
  </AbsoluteFill>
);
