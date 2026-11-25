import React from "react";
import { MedicalStudioLighting } from "./MedicalStudioLighting";

export type CinematicAnatomyFocusProps = {
  frame?: number;
  lightIntensity?: number;
  accentColor?: string;
  vignette?: boolean;
};

/** Paket lampu dan aksen sinematik untuk menonjolkan objek anatomi. */
export const CinematicAnatomyFocus: React.FC<CinematicAnatomyFocusProps> = ({
  frame = 0, lightIntensity = 1.5, accentColor = "#68cce8", vignette = true,
}) => {
  const sweep = Math.sin(frame * 0.018) * 2.5;
  return <>
    <MedicalStudioLighting intensity={lightIntensity} fillColor={accentColor} rimColor={accentColor} />
    <spotLight position={[sweep, 4, 4]} angle={0.58} penumbra={0.8} intensity={lightIntensity * 1.5} color="#ffffff" />
    {vignette && <pointLight position={[0, -3, 2]} intensity={0.35} color={accentColor} distance={9} />}
  </>;
};
