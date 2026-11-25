import React from "react";
import { PerspectiveCamera } from "@react-three/drei";

export type MacroMedicalCameraProps = {
  position?: [number, number, number];
  target?: [number, number, number];
  magnification?: number;
  frame?: number;
  pulse?: number;
};

/** Kamera makro dengan perubahan jarak halus untuk detail jaringan dan sel. */
export const MacroMedicalCamera: React.FC<MacroMedicalCameraProps> = ({
  position = [0, 0, 2.4], magnification = 1, frame = 0, pulse = 0.025,
}) => {
  const distance = Math.max(0.35, position[2] / magnification + Math.sin(frame * 0.035) * pulse);
  return <PerspectiveCamera makeDefault position={[position[0], position[1], distance]} fov={28} near={0.01} far={40} />;
};
