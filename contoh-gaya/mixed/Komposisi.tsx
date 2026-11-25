// Contoh gaya ADRIY Mixed Media Documentary (9:16): tiga konsep topik berbeda.
import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Ep1Cetak } from "./Ep1Cetak";
import { Ep2Lampu } from "./Ep2Lampu";
import { Ep3Telur } from "./Ep3Telur";

export const ContohMixed: React.FC = () => (
  <AbsoluteFill style={{ background: "#D5C1A1" }}>
    <Sequence durationInFrames={110}><Ep1Cetak /></Sequence>
    <Sequence from={110} durationInFrames={110}><Ep2Lampu /></Sequence>
    <Sequence from={220} durationInFrames={110}><Ep3Telur /></Sequence>
  </AbsoluteFill>
);
