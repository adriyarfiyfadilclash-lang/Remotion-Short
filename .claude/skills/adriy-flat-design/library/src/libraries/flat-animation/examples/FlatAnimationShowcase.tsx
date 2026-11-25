import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { FlatPop, FlatSlide, FlatBounce, FlatFloat, FlatStagger, FlatDrawOn } from "../src";

const colors = ["#246BFD", "#FFB547", "#F05D5E", "#25B88A"];
const Tile: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div style={{ width: 210, height: 150, borderRadius: 22, background: color,
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontFamily: "Arial, sans-serif", fontWeight: 800, fontSize: 27 }}>
    {label}
  </div>
);
const Background: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: "#F4F6FA", justifyContent: "center", alignItems: "center" }}>
    {children}
  </AbsoluteFill>
);

export const FlatAnimationShowcase: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={0} durationInFrames={60}>
      <Background><FlatPop><Tile color={colors[0]} label="POP IN" /></FlatPop></Background>
    </Sequence>
    <Sequence from={60} durationInFrames={60}>
      <Background><FlatSlide direction="right"><Tile color={colors[1]} label="SLIDE" /></FlatSlide></Background>
    </Sequence>
    <Sequence from={120} durationInFrames={60}>
      <Background><FlatBounce><Tile color={colors[2]} label="BOUNCE" /></FlatBounce></Background>
    </Sequence>
    <Sequence from={180} durationInFrames={90}>
      <Background><FlatFloat amplitude={12}><Tile color={colors[3]} label="FLOAT" /></FlatFloat></Background>
    </Sequence>
    <Sequence from={270} durationInFrames={90}>
      <Background>
        <FlatStagger items={colors.map((color, i) => <Tile color={color} label={`ITEM ${i+1}`} />)}
          gap={10} direction="up" />
      </Background>
    </Sequence>
    <Sequence from={360} durationInFrames={60}>
      <Background><FlatDrawOn direction="left"><Tile color={colors[0]} label="DRAW ON" /></FlatDrawOn></Background>
    </Sequence>
  </AbsoluteFill>
);
