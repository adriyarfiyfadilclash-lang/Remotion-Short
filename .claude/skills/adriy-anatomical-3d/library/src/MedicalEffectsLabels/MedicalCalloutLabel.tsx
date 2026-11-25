import React from "react";
import { Html } from "@react-three/drei";

export type MedicalCalloutLabelProps = {
  title: string;
  detail?: string;
  position?: [number, number, number];
  color?: string;
  distanceFactor?: number;
  visible?: boolean;
};

/** Label anatomi yang mengikuti posisi objek 3D. */
export const MedicalCalloutLabel: React.FC<MedicalCalloutLabelProps> = ({
  title, detail, position = [0, 0, 0], color = "#7bd8f0",
  distanceFactor = 8, visible = true,
}) => (
  <Html position={position} center distanceFactor={distanceFactor} style={{ pointerEvents: "none" }}>
    {visible && <div style={{
      minWidth: 130, padding: "9px 12px", border: `1px solid ${color}`,
      borderRadius: 8, background: "rgba(7,20,31,.9)", color: "#f2fbff",
      fontFamily: "Arial,sans-serif", boxShadow: `0 0 18px ${color}44`,
      whiteSpace: "nowrap",
    }}>
      <div style={{fontSize:12,fontWeight:700,letterSpacing:1.2,color}}>{title}</div>
      {detail && <div style={{fontSize:10,marginTop:4,color:"#c5d8e2"}}>{detail}</div>}
    </div>}
  </Html>
);
