import React from "react";

export type ScanSweepEffectProps = {
  frame?: number;
  duration?: number;
  width?: number;
  height?: number;
  color?: string;
  opacity?: number;
  position?: [number, number, number];
};

/** Bidang pemindaian yang bergerak konsisten mengikuti frame Remotion. */
export const ScanSweepEffect: React.FC<ScanSweepEffectProps> = ({
  frame = 0, duration = 90, width = 3.2, height = 3.2,
  color = "#65d7f2", opacity = 0.28, position = [0,0,0],
}) => {
  const progress = (frame % duration) / duration;
  const y = (progress - 0.5) * height;
  return <group position={position}>
    <mesh position={[0,y,0]}>
      <planeGeometry args={[width,0.035]}/>
      <meshBasicMaterial color={color} transparent opacity={opacity}/>
    </mesh>
    <pointLight position={[0,y,0.08]} color={color} intensity={0.45} distance={width * 1.8}/>
  </group>;
};
