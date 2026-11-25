import React from "react";
import { Html } from "@react-three/drei";

export type MedicalAnnotationPanelProps = {
  heading: string;
  body: string;
  position?: [number,number,number];
  accent?: string;
  width?: number;
};

/** Panel keterangan ringkas yang ditempatkan di dalam adegan 3D. */
export const MedicalAnnotationPanel: React.FC<MedicalAnnotationPanelProps> = ({
  heading, body, position = [1.4,0.6,0], accent = "#78d8ee", width = 220,
}) => <Html position={position} transform={false} distanceFactor={7} style={{pointerEvents:"none"}}>
  <div style={{width,padding:14,boxSizing:"border-box",background:"rgba(8,20,31,.94)",borderLeft:`3px solid ${accent}`,borderRadius:7,color:"#edf7fb",fontFamily:"Arial,sans-serif",boxShadow:"0 8px 28px #0005"}}>
    <div style={{fontSize:12,fontWeight:700,letterSpacing:1.1,color:accent,marginBottom:7}}>{heading}</div>
    <div style={{fontSize:11,lineHeight:1.5,color:"#c6d5de",whiteSpace:"normal"}}>{body}</div>
  </div>
</Html>;
