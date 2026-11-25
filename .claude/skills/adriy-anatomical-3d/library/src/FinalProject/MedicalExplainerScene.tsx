import React from "react";

export type MedicalExplainerSceneProps = {
  title: string;
  subtitle?: string;
  chapter?: string;
  accent?: string;
  children?: React.ReactNode;
};

/** Lapisan teks edukasi yang ditempatkan di atas Canvas. */
export const MedicalExplainerScene: React.FC<MedicalExplainerSceneProps> = ({
  title, subtitle, chapter = "ADRIY.PROJECT • ANATOMICAL 3D",
  accent = "#79cde5", children,
}) => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", fontFamily: "Arial,sans-serif", color: "#eff8fc" }}>
    <div style={{ position: "absolute", top: 38, left: 54, right: 54 }}>
      <div style={{ fontSize: 12, letterSpacing: 4, color: accent, fontWeight: 700 }}>{chapter}</div>
      <div style={{ fontSize: 34, fontWeight: 800, marginTop: 12, letterSpacing: 0.4 }}>{title}</div>
      {subtitle && <div style={{ fontSize: 16, marginTop: 8, color: "#c2d3dc" }}>{subtitle}</div>}
    </div>
    {children}
  </div>
);
