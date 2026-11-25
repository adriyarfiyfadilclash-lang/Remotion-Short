import React from "react";
import { Html } from "@react-three/drei";

export type CosmicInfoLabel3DProps = {
  position?: [number, number, number];
  title: string;
  description?: string;
  accentColor?: string;
  width?: number;
  align?: "left" | "center" | "right";
};

/** Compact title-and-description panel anchored to a 3D position. */
export const CosmicInfoLabel3D: React.FC<CosmicInfoLabel3DProps> = ({
  position = [0, 0, 0], title, description,
  accentColor = "#75d8ff", width = 230, align = "left",
}) => <group position={position}>
  <Html center distanceFactor={10} style={{ pointerEvents: "none", width }}>
    <div style={{
      boxSizing: "border-box", width, padding: "11px 14px",
      background: "linear-gradient(135deg, rgba(5,15,35,.94), rgba(10,28,55,.82))",
      border: `1px solid ${accentColor}`, borderLeft: `3px solid ${accentColor}`,
      borderRadius: 7, color: "#f2f8ff", fontFamily: "Arial, sans-serif",
      textAlign: align, boxShadow: "0 0 18px rgba(52,155,255,.16)",
    }}>
      <div style={{ color: accentColor, fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase" }}>{title}</div>
      {description ? <div style={{ marginTop: 6, color: "#c3d4e8", fontSize: 12, lineHeight: 1.45 }}>{description}</div> : null}
    </div>
  </Html>
</group>;
