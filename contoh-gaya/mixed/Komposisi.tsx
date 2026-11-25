// Contoh gaya ADRIY Mixed Media (9:16): tiga komposisi kolase berbeda.
import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Ep1Kamera } from "./Ep1Kamera";
import { Ep2Kopi } from "./Ep2Kopi";
import { Ep3Mi } from "./Ep3Mi";

export const ContohMixed: React.FC = () => (
  <AbsoluteFill style={{ background: "#D9C3A0" }}>
    <Sequence durationInFrames={110}><Ep1Kamera /></Sequence>
    <Sequence from={110} durationInFrames={110}><Ep2Kopi /></Sequence>
    <Sequence from={220} durationInFrames={110}><Ep3Mi /></Sequence>
  </AbsoluteFill>
);
