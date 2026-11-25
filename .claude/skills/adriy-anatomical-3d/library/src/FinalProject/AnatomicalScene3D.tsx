import React from "react";
import { Canvas } from "@react-three/fiber";

export type AnatomicalScene3DProps = {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  fov?: number;
  background?: string;
  dpr?: number | [number, number];
  className?: string;
};

/** Wadah Canvas standar untuk adegan anatomi ADRIY.PROJECT. */
export const AnatomicalScene3D: React.FC<AnatomicalScene3DProps> = ({
  children, cameraPosition = [0, 0.2, 6], fov = 42,
  background = "#0c1822", dpr = [1, 2], className,
}) => (
  <div className={className} style={{ position: "absolute", inset: 0, background }}>
    <Canvas dpr={dpr} camera={{ position: cameraPosition, fov }} gl={{ antialias: true, alpha: false }}>
      <color attach="background" args={[background]} />
      {children}
    </Canvas>
  </div>
);
