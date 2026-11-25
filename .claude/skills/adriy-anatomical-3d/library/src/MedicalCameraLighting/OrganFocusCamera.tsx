import React from "react";
import { PerspectiveCamera } from "@react-three/drei";

export type OrganFocusCameraProps = {
  organPosition?: [number, number, number];
  distance?: number;
  fov?: number;
  frame?: number;
  drift?: number;
};

/** Sudut kamera dekat untuk menonjolkan satu organ atau bagian anatomi. */
export const OrganFocusCamera: React.FC<OrganFocusCameraProps> = ({
  organPosition = [0, 0, 0], distance = 3.2, fov = 34, frame = 0, drift = 0.025,
}) => {
  const x = Math.sin(frame * drift) * 0.12;
  return <PerspectiveCamera makeDefault position={[organPosition[0] + x, organPosition[1] + 0.25, organPosition[2] + distance]} fov={fov} near={0.05} far={80} />;
};
