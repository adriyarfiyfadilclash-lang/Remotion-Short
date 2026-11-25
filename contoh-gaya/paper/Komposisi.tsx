// Contoh gaya ADRIY Paper Cutout (9:16): diorama kertas berlapis yang tampak seperti difoto.
import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Ep1Laut } from "./Ep1Laut";
import { Ep2Gunung } from "./Ep2Gunung";
import { Ep3Kupu } from "./Ep3Kupu";

export const ContohPaper: React.FC = () => (
  <AbsoluteFill style={{ background: "#E9DFC7" }}>
    <Sequence durationInFrames={110}><Ep1Laut /></Sequence>
    <Sequence from={110} durationInFrames={110}><Ep2Gunung /></Sequence>
    <Sequence from={220} durationInFrames={110}><Ep3Kupu /></Sequence>
  </AbsoluteFill>
);
