import React from "react";
import { Line, Html } from "@react-three/drei";

export type MeasurementOverlay3DProps = {
  start?: [number,number,number];
  end?: [number,number,number];
  label?: string;
  unit?: string;
  color?: string;
};

/** Penanda jarak sederhana untuk visual edukasi anatomi. */
export const MeasurementOverlay3D: React.FC<MeasurementOverlay3DProps> = ({
  start = [-0.8,0,0], end = [0.8,0,0], label = "1.6", unit = "cm",
  color = "#f6d477",
}) => {
  const midpoint: [number,number,number] = [
    (start[0]+end[0])/2, (start[1]+end[1])/2 + 0.12, (start[2]+end[2])/2
  ];
  return <>
    <Line points={[start,end]} color={color} lineWidth={1.6}/>
    <Line points={[[start[0],start[1]-0.07,start[2]],[start[0],start[1]+0.07,start[2]]]} color={color} lineWidth={1.4}/>
    <Line points={[[end[0],end[1]-0.07,end[2]],[end[0],end[1]+0.07,end[2]]]} color={color} lineWidth={1.4}/>
    <Html position={midpoint} center distanceFactor={8}>
      <div style={{padding:"4px 8px",borderRadius:5,background:"rgba(8,20,30,.9)",border:`1px solid ${color}`,color,font:"12px Arial",whiteSpace:"nowrap"}}>{label} {unit}</div>
    </Html>
  </>;
};
