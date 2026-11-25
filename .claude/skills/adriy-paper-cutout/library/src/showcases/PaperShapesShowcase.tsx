import React from "react";
import { AbsoluteFill } from "remotion";
import { PaperShape, PaperBlob, PaperArrow, PaperSymbol, PaperTornEdge, PaperCollage } from "../paper/shapes-elements";

export const PaperShapesShowcase: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#F5EBDD", fontFamily: "Georgia, serif", color: "#39332B", padding: 70 }}>
    <div style={{ fontSize: 46, fontWeight: 700 }}>Bentuk dari Kertas</div>
    <div style={{ position: "absolute", left: 80, top: 170 }}><PaperShape kind="circle" color="#E7B85C" size={150} /></div>
    <div style={{ position: "absolute", left: 270, top: 185 }}><PaperShape kind="triangle" color="#D77F69" size={135} rotation={8} delay={4} /></div>
    <div style={{ position: "absolute", left: 460, top: 170 }}><PaperBlob color="#6F9C8E" size={160} delay={8} /></div>
    <div style={{ position: "absolute", left: 690, top: 190 }}><PaperSymbol kind="sun" color="#E7B85C" size={110} delay={12} /></div>
    <div style={{ position: "absolute", left: 850, top: 210 }}><PaperArrow color="#6F9C8E" width={170} delay={16} /></div>
    <div style={{ position: "absolute", left: 80, top: 430, width: 470, height: 150 }}><PaperCollage items={[
      { id: "a", x: 0, y: 10, width: 120, height: 125, color: "#D77F69", rotation: -7, zIndex: 1 },
      { id: "b", x: 95, y: 0, width: 125, height: 135, color: "#E7B85C", rotation: 5, zIndex: 2 },
      { id: "c", x: 205, y: 15, width: 125, height: 125, color: "#6F9C8E", rotation: -3, zIndex: 3 },
    ]} /></div>
    <div style={{ position: "absolute", left: 640, top: 440 }}><PaperSymbol kind="leaf" color="#6F9C8E" size={115} /></div>
    <div style={{ position: "absolute", left: 790, top: 440 }}><PaperSymbol kind="heart" color="#D77F69" size={110} delay={5} /></div>
    <div style={{ position: "absolute", left: 70, top: 690 }}><PaperTornEdge width={900} height={45} color="#E7D7BC" /></div>
  </AbsoluteFill>
);
