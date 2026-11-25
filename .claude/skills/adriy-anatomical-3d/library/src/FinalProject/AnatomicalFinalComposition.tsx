import React from "react";
import { AbsoluteFill } from "remotion";
import { AnatomicalScene3D } from "./AnatomicalScene3D";
import { MedicalExplainerScene } from "./MedicalExplainerScene";

export type AnatomicalFinalCompositionProps = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  frameLabel?: string;
  background?: string;
  cameraPosition?: [number,number,number];
  fov?: number;
};

/** Komposisi siap pakai: Canvas 3D, judul edukasi, dan penanda frame. */
export const AnatomicalFinalComposition: React.FC<AnatomicalFinalCompositionProps> = ({
  children, title, subtitle, frameLabel, background = "#0c1822",
  cameraPosition = [0,0.2,6], fov = 42,
}) => (
  <AbsoluteFill style={{background}}>
    <AnatomicalScene3D background={background} cameraPosition={cameraPosition} fov={fov}>
      {children}
    </AnatomicalScene3D>
    <MedicalExplainerScene title={title} subtitle={subtitle}/>
    {frameLabel && <div style={{position:"absolute",bottom:24,left:0,right:0,textAlign:"center",fontFamily:"Arial,sans-serif",fontSize:12,letterSpacing:2,color:"#9db4c2",pointerEvents:"none"}}>{frameLabel}</div>}
  </AbsoluteFill>
);
